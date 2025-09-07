## Github

A Version Control System (VSC) saves changes to a file locally or remotely (e.g. Git).
Github is a 'host' that hosts Git remotely.

## Contents
- [Git](#git)
- [Github setup](#github-setup)
- [Repository setup](#repository-setup)
- [Updating repositories](#updating-repositories)
- [Insights](#insights)
- [Branches](#branches)
- [Multiple accounts](#multiple-accounts)
- [Changing commits](#changing-commits)
- [Merge and rebase](#merge-and-rebase)

## Github setup

`ssh-keygen -t ed25519`: generate an SSH key on your computer with the ED25519 cryptographic algorithm(-t type)
> Use the generated public key in 'SSH keys' on Github

`git config -l`: list all configurations\
`git config user.email`: list user.email in config file (email used locally)

`git config --global user.email "email"`: set global email\
`git config --global user.name "name"`: set global username 

`git config --global init.defaultBranch master`: suppress warning about 'master' as the initial branch name

## Repository setup

The easiest way to setup a new repository is to creat one on Github and cloning it locally.

`git clone 'link'`: creates a linked copy by cloning a repository into a directory

In order to make a Github repository in an already existing folder use:

`git init`: initalize an empty repository\
`git remote add origin <link>`: add corresponding remote repository\
`git branch -M main`: rename current branch to main

Then commit and push your local folder.

In order to delete a git repository delete the .git.

Forking a repository trough github creates an unlinked copy meaning it's changes will never affect the main repository.

<!-- ## Commits -->
## Updating repositories

A commit is record of what changes you have made since the last time.

`git add 'file'`: add specified file to staging area\
`git add .`: add all files to staging area expect deletions\
`git add -A`: stage all changes including deletions

`git restore --staged .`: remove staged files from staging area

>The staging area stores information about what will go into your next commit

`git commit -m 'message'`: save staging area to local repository\
`git commit -a`: automatically stage modified or deleted files expect newly created files

`git push origin main`: push commits to linked remote repo\
`-u`: sets default remote branch for current local branch\
`-f`: force push to branch

>Origin is a reference to the URL from the remote repository that a project was originally cloned from.

`git pull origin 'main'`: pull changes to local repository
>If git pull is used in a branch only changes from that specific branch are pulled

`git fetch`: update local copy of the remote repository
>Fetching a repository allows one to review changes before merging by using diff

Merge conflicts occur when files have already been changed when pulling/pushing.

## Insights
<!-- ## Repository statistics -->

`git log`: log of commit history\
`git log --all --graph`: show commit history in graph form

`git ls-files`: list all files on github repository\
`git status`: shows files that are out of sync

`git show "commit-hash"`: show changes in a specfic git commit

Git diff is a function that takes two input data sources and shows the changes between them. These data sources can be commits, branches, files, etc.

`git diff`: list changes between local directory and staging area\
`git diff --stat`: list changes in an easier to read format\
`git diff origin/main`: list changes between local and remote repository

## Branches

A branch is an unlinked copy of the main repository.
Each repository has one default branch (e.g. main) from which other branches are created. 

`git checkout -b "name"`: create a new branch and automatically switch to it
`git checkout "name"`: switch to branch "name"

`git branch -M 'name'`: rename branch to specified name

Merging combines the changes from one branch into the main branch.

`git merge "branch"`: merges "branch" into current branch

A common branching strategy is:
1. main branch stores the original code for a project's codebase (e.g. release)
2. development branch where completed code is staged before release
3. new branches are created from the development branch for each new feature

## Multiple accounts

`ssh-keygen -t ed25519 -C "email"`: generate an SSH key with -C option meaning comment

`ssh-add C:\Users\User\.ssh\id_ed25519.pub`: add SSH key to ssh-agent
>Useful when using passphrases so you only have to type the passphrase once

Create a 'config' file in the .ssh folder containing the following:

    #Default Github
    Host github.com
        HostName github.com
        User git
        IdentityFile C:\Users\User\.ssh\id_ed25519

    Host github.com-school
        HostName github.com
        User git
        IdentityFile C:\Users\User\.ssh\id_ed25519_school

`git clone git@github.com-school:example/school.git`: using github.com-school to clone repository specific to that account

`git config user.email "email"`: change email used for commits per repository

## Changing commits

`git commit --amend`: change message of last commit

`git reset --soft <commit-hash>`: undo specific commit and preserve changes \
`HEAD~1`: undo latest commit\
`--hard`: deletes changes

`git rebase -i HEAD~X`: modify commits with the interactive rebase tool\
`X` is the number of commits to go back

Change pick into r, reword and save the file to edit the commit message.

Force push to remote repository to update the commit messages. Use `--force-with-lease` to prevent overwriting someone elses work.

## Merge and rebase

Git merge and git rebase are both commands used to intergrate changes from one branch into another.

#### Merging

<!--![Alt text](https://www.themoderncoder.com/uploads/git-merge-graphic.png)-->

>Git merge will keep the feature branch intact and place it onto main.

#### Rebasing

<!--![Alt text](./img/IMG_TEST.png)-->

<img src="./img/IMG_TEST.png" alt="Alt Text" width="640" height="360">

>Git rebase will move all of the commits on your feature branch and move them on top of main.

<!-- https://www.themoderncoder.com/a-better-git-workflow-with-rebase/ -->
