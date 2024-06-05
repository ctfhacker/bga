let
  pkgs = import (fetchTarball("channel:nixpkgs-23.11-darwin")) {};
in 

pkgs.mkShell rec {
  nativeBuildInputs = [
    pkgs.pkg-config
  ];

  buildInputs = with pkgs; [ 
    pkg-config
    php83.unwrapped
    sshfs
    lsyncd

    # PHP language server
    nodePackages.intelephense  

    # JS language server
    nodePackages.typescript-language-server 
  ];

  # shellHook = ''
  # mkdir -p remote
  # mkdir -p work

  ## Unmount dir if in use
  # fusermount -u ./remote

  ## Mount remote dir
  # sshfs TheBarbershopper@1.studio.boardgamearena.com: ./remote

  ## Start auto-sync from local to remote
  # killall lsyncd
  # lsyncd -delay 1 -rsync work/ ./remote/barbershoppertesthearts
  # '';

  # rsync -vlrt ./work/ ./remote/barbershoppertesthearts
}
