#include <X11/Xlib.h>
#include <X11/extensions/XTest.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    Display *display = XOpenDisplay(NULL);
    if (!display) {
        fprintf(stderr, "Gagal membuka koneksi X11 Display\n");
        return 1;
    }

    // Mode daemon (stdin pipe reading)
    if (argc > 1 && strcmp(argv[1], "daemon") == 0) {
        char line[256];
        setbuf(stdout, NULL);
        setbuf(stdin, NULL);

        while (fgets(line, sizeof(line), stdin)) {
            int button = 1, count = 1, x = -1, y = -1;
            int num = sscanf(line, "%d %d %d %d", &button, &count, &x, &y);
            if (num < 1) continue;

            if (x >= 0 && y >= 0) {
                XTestFakeMotionEvent(display, -1, x, y, CurrentTime);
                XFlush(display);
            }

            for (int i = 0; i < count; i++) {
                XTestFakeButtonEvent(display, button, True, CurrentTime);
                XFlush(display);
                usleep(1000); // 1ms press
                XTestFakeButtonEvent(display, button, False, CurrentTime);
                XFlush(display);
                if (i < count - 1) usleep(1000);
            }
        }
        XCloseDisplay(display);
        return 0;
    }

    // One-shot mode
    int button = (argc > 1) ? atoi(argv[1]) : 1;
    int count = (argc > 2) ? atoi(argv[2]) : 1;
    int x = (argc > 3) ? atoi(argv[3]) : -1;
    int y = (argc > 4) ? atoi(argv[4]) : -1;

    if (x >= 0 && y >= 0) {
        XTestFakeMotionEvent(display, -1, x, y, CurrentTime);
        XFlush(display);
    }

    for (int i = 0; i < count; i++) {
        XTestFakeButtonEvent(display, button, True, CurrentTime);
        XFlush(display);
        usleep(1000);
        XTestFakeButtonEvent(display, button, False, CurrentTime);
        XFlush(display);
        if (i < count - 1) usleep(1000);
    }

    XCloseDisplay(display);
    return 0;
}
