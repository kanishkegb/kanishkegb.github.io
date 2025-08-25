---
layout: post
title: "Git Cheatsheet"
category: [tutorials, guides]
image: assets/images/posts/tutorial.png
# featured: true
---

This is a quick cheatsheet for git aliases that I use often.

## Git Aliases

```bash
alias ga='git add'
alias gst='git status'
alias gd='git diff'
alias gco='git checkout'
alias gcod='git checkout development'
alias gcom='git checkout main'
alias gb='git branch'
alias gl='git pull'
alias gp='git push'
alias gcam='git commit -am'
alias gdt='git diff-tree --no-commit-id --name-only -r' 
alias gf-'git fetch' 
alias go='git fetch origin' 
alias gpr= git remote prune origin'
alias gprd="git branch -vv | awk '/: gone]/{print \$1}' | xargs git branch -d" # does not need escape backslash before $ on *nix systems
```