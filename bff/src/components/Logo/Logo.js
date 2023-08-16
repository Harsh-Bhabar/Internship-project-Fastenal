import React from "react";

export default function Logo(props) {
  const { lightTheme } = props;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 196 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M87.51 1.76002H91.35L93.78 8.81002L96.24 1.76002H100.05L96.39 11.45L99.09 18.23L105.12 1.70002H109.62L101.1 23H97.53L93.78 14.06L90.06 23H86.49L78 1.70002H82.44L88.5 18.23L91.14 11.45L87.51 1.76002Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M117.334 1.70002H121.534L129.364 23H125.104L123.124 17.69H115.684L113.734 23H109.474L117.334 1.70002ZM122.374 14.78L119.434 5.99002L116.374 14.78H122.374Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M147.138 5.33002H140.328V23H136.218V5.33002H129.408V1.70002H147.138V5.33002Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M149.494 12.2C149.494 10.9 149.724 9.63002 150.184 8.39002C150.664 7.13002 151.354 5.99002 152.254 4.97002C153.154 3.93002 154.254 3.11002 155.554 2.51002C156.854 1.89002 158.334 1.58002 159.994 1.58002C161.954 1.58002 163.644 2.01002 165.064 2.87002C166.504 3.73002 167.574 4.85002 168.274 6.23002L165.094 8.42002C164.734 7.62002 164.264 6.99002 163.684 6.53002C163.104 6.05002 162.484 5.72002 161.824 5.54002C161.164 5.34002 160.514 5.24002 159.874 5.24002C158.834 5.24002 157.924 5.45002 157.144 5.87002C156.384 6.29002 155.744 6.84002 155.224 7.52002C154.704 8.20002 154.314 8.96002 154.054 9.80002C153.814 10.64 153.694 11.48 153.694 12.32C153.694 13.26 153.844 14.17 154.144 15.05C154.444 15.91 154.864 16.68 155.404 17.36C155.964 18.02 156.624 18.55 157.384 18.95C158.164 19.33 159.014 19.52 159.934 19.52C160.594 19.52 161.264 19.41 161.944 19.19C162.624 18.97 163.254 18.62 163.834 18.14C164.414 17.66 164.864 17.04 165.184 16.28L168.574 18.23C168.154 19.29 167.464 20.19 166.504 20.93C165.564 21.67 164.504 22.23 163.324 22.61C162.144 22.99 160.974 23.18 159.814 23.18C158.294 23.18 156.904 22.87 155.644 22.25C154.384 21.61 153.294 20.77 152.374 19.73C151.474 18.67 150.764 17.49 150.244 16.19C149.744 14.87 149.494 13.54 149.494 12.2Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M190.761 1.70002V23H186.651V13.91H176.991V23H172.851V1.70002H176.991V10.31H186.651V1.70002H190.761Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M87.51 36.76H91.35L93.78 43.81L96.24 36.76H100.05L96.39 46.45L99.09 53.23L105.12 36.7H109.62L101.1 58H97.53L93.78 49.06L90.06 58H86.49L78 36.7H82.44L88.5 53.23L91.14 46.45L87.51 36.76Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M121.572 58.15C120.012 58.15 118.592 57.85 117.312 57.25C116.052 56.65 114.962 55.84 114.042 54.82C113.142 53.78 112.442 52.62 111.942 51.34C111.442 50.04 111.192 48.71 111.192 47.35C111.192 45.93 111.452 44.58 111.972 43.3C112.512 42 113.242 40.85 114.162 39.85C115.102 38.83 116.202 38.03 117.462 37.45C118.742 36.85 120.142 36.55 121.662 36.55C123.202 36.55 124.602 36.86 125.862 37.48C127.142 38.1 128.232 38.93 129.132 39.97C130.032 41.01 130.732 42.17 131.232 43.45C131.732 44.73 131.982 46.05 131.982 47.41C131.982 48.81 131.722 50.16 131.202 51.46C130.682 52.74 129.952 53.89 129.012 54.91C128.092 55.91 126.992 56.7 125.712 57.28C124.452 57.86 123.072 58.15 121.572 58.15ZM115.392 47.35C115.392 48.27 115.532 49.16 115.812 50.02C116.092 50.88 116.492 51.65 117.012 52.33C117.552 52.99 118.202 53.52 118.962 53.92C119.742 54.3 120.622 54.49 121.602 54.49C122.602 54.49 123.492 54.29 124.272 53.89C125.052 53.47 125.702 52.92 126.222 52.24C126.742 51.54 127.132 50.77 127.392 49.93C127.672 49.07 127.812 48.21 127.812 47.35C127.812 46.43 127.662 45.55 127.362 44.71C127.082 43.85 126.672 43.09 126.132 42.43C125.612 41.75 124.962 41.22 124.182 40.84C123.422 40.44 122.562 40.24 121.602 40.24C120.582 40.24 119.682 40.45 118.902 40.87C118.142 41.27 117.502 41.81 116.982 42.49C116.462 43.17 116.062 43.93 115.782 44.77C115.522 45.61 115.392 46.47 115.392 47.35Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M136.658 58V36.7H146.077C147.057 36.7 147.958 36.9 148.778 37.3C149.618 37.7 150.338 38.24 150.938 38.92C151.558 39.6 152.028 40.36 152.348 41.2C152.688 42.04 152.857 42.9 152.857 43.78C152.857 44.68 152.698 45.55 152.378 46.39C152.078 47.21 151.638 47.93 151.058 48.55C150.478 49.17 149.798 49.65 149.018 49.99L153.878 58H149.317L144.938 50.86H140.798V58H136.658ZM140.798 47.23H145.988C146.508 47.23 146.968 47.08 147.368 46.78C147.768 46.46 148.087 46.04 148.327 45.52C148.567 45 148.688 44.42 148.688 43.78C148.688 43.1 148.548 42.51 148.268 42.01C147.988 41.49 147.628 41.08 147.188 40.78C146.768 40.48 146.308 40.33 145.808 40.33H140.798V47.23Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M158.109 58V36.7H162.249V54.37H173.109V58H158.109Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M177.128 58V36.7H184.868C187.188 36.7 189.128 37.18 190.688 38.14C192.248 39.08 193.418 40.36 194.198 41.98C194.978 43.58 195.368 45.36 195.368 47.32C195.368 49.48 194.938 51.36 194.078 52.96C193.218 54.56 191.998 55.8 190.418 56.68C188.858 57.56 187.008 58 184.868 58H177.128ZM191.198 47.32C191.198 45.94 190.948 44.73 190.448 43.69C189.948 42.63 189.228 41.81 188.288 41.23C187.348 40.63 186.208 40.33 184.868 40.33H181.268V54.37H184.868C186.228 54.37 187.378 54.07 188.318 53.47C189.258 52.85 189.968 52.01 190.448 50.95C190.948 49.87 191.198 48.66 191.198 47.32Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M48.9802 5.90029C44.0573 1.57881 39.9685 0.412439 32.7004 0V7.33265C38.7572 7.71954 39.6171 7.90211 43.2003 10.9169L48.9802 5.90029Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M54.698 28.1477H61.9996C61.5096 20.8659 59.8473 16.6933 55.4275 11.7902L51.0112 17.3642C54.1235 20.9322 54.237 23.2932 54.698 28.1477Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M54.695 31.7485C53.9235 43.8769 43.8889 53.4959 31.6319 53.4959C18.8722 53.4959 8.10979 43.1334 8.10979 30.3574C8.10979 18.195 18.1492 8.24367 29.0497 7.30979V0C13.3045 0.944802 0.842773 14.2108 0.842773 30.3889C0.842773 47.1783 14.6743 60.773 31.4405 60.773C47.709 60.773 61.2232 47.5154 61.9996 31.7485H54.695Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
      <path
        d="M53.7002 7.4077C53.1929 6.88537 52.3752 6.84221 51.8008 7.31705L30.0309 25.8144C29.2301 26.6432 28.7898 27.7396 28.7898 28.9138C28.7898 30.0491 29.2175 31.124 30.0016 31.9269C30.7856 32.7298 31.8381 33.1787 32.966 33.1874C34.0142 33.1787 35.1044 32.7773 35.8969 31.9916L43.6455 22.3868L53.8176 9.34593C54.2579 8.7718 54.2076 7.93003 53.7002 7.4077Z"
         fill={lightTheme ? "white" : "var(--black)"}
      />
    </svg>
  );
}
