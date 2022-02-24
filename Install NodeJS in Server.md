# Set Up NodeJS inServer

_Reference_ [How To Set Up a Node.js Application for Production on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/como-configurar-una-aplicacion-de-node-js-para-produccion-en-ubuntu-18-04-es)

## 🚀 Quick start

1.  **Create a NodeJS Aplication in Ubuntu Server.**

2.  **Install Ubuntu**

3.  **Updating Currently Installed Packages**

    Before beginning the release upgrade, it’s safest to update to the latest versions of all packages _for the current release_. Begin by updating the package list:

    ```shell
    $ sudo apt-get update
    ```

    Next, upgrade installed packages to their latest available versions:

    ```shell
    $ sudo apt-get upgrade
    ```

    You will be shown a list of upgrades, and prompted to continue. Answer **y** for yes and press **Enter**.

    This process may take some time. Once it finishes, use the `dist-upgrade` command with `apt-get`, which will perform any additional upgrades that involve changing dependencies, adding or removing new packages as necessary. This will handle a set of upgrades which may have been held back by `apt-get upgrade`:

    ```shell
    $ sudo apt-get dist-upgrade
    ```

    Again, answer **y** when prompted to continue, and wait for upgrades to finish.

4.  **Install Git**

    _Reference_ [How To Install Git on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-18-04)

    ```shell
    $ sudo apt update
    $ sudo apt install git
    ```

    Puede confirmar que instaló Git de forma correcta ejecutando el siguiente comando:

    ```shell
    $ git --version
    ```

5.  **Setting Up Git**

    Now that you have Git installed, you should configure it so that the generated commit messages will contain your correct information.

    This can be achieved by using the `git config` command. Specifically, we need to provide our name and email address because Git embeds this information into each commit we do. We can go ahead and add this information by typing:

    ```shell
    $ git config --global user.name "Your Name"
    $ git config --global user.email "youremail@domain.com"
    ```

6.  **Install Node.JS & NPM**

    ```shell
    $ sudo apt install nodejs
    ```

    ```shell
    $ sudo apt install npm
    ```

7.  **Upload a Git Repository**

    ```shell
    $ git clone https://www.github.com/username/repo-name
    ```

8.  **Upload Node.JS Dependences**

    ```shell
    npm install -g npm-check-updates
    ```
