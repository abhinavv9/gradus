---
title: "Neovim Essentials: Unlock the Power of Elite Coding"
description: "This CodeLab demonstrates how to setup neovim for yourself"
slug: "neovim-essentials"
authors:
  [
    {
      name: "Abhinav Verma",
      image: "/authors/abhinav.jpg",
      socials:
        {
          linkedin: "https://www.linkedin.com/in/abhinavv9",
          github: "https://github.com/abhinavv9",
          web: "https://sudoboink.me",
        },
    },
  ]
date: 2024-05-13
categories: "Technology"
duration: 15
image: "/codelabs/neovim-essentials/hero.jpg"
tags: ["VIM", "NEOVIM"]
draft: false
---

# Introduction

Neovim is an enhanced version of the Vim editor, designed for efficient code editing with features like asynchronous tasks, embedded terminals, and extensive plugin support using Lua. It offers a streamlined, keyboard-centric interface aimed at developers seeking a powerful, customizable coding environment.

## How to Get Neovim on Your Computer

Let's get Neovim on your computer! Just type these commands:

```bash
# First, let's tell your computer where to find Neovim
sudo add-apt-repository ppa:neovim-ppa/unstable

# Then, let's get Neovim installed
sudo apt-get update
sudo apt-get install neovim## Install
```

# Setup

```bash
mkdir ~/.config/nvim
touch ~/.config/nvim/init.lua
```

## Start nvim

- goto ~/.config/nvim folder, and run the `nvim` command to open vim editor.
- To open the file explorer execute the follwing key combination ->

  ```
  :Ex
  ```

  - Now you can see a `init.lua` file.

  - Let's see if it's working
    - type `print("Hello World")` inside init.lua.
    - Close vim via `:q`
    - Open up again and there you have it on the bottom left corner ->
      ![Hello world](/codelabs/neovim-essentials/hello.png)

  ##### Let's create a folder to store all our configs.

  - To create folders while being inside vim use `d`

  - So, goto the netrw(File explorer) using `:Ex` and press `d`
  - You will see this pop up in the command line bar
    ![Create directory](/codelabs/neovim-essentials/create-dir.png)
  - Type `lua` since any directory inside lua directory is requirable by lua.
  - Inside lua dir create another dir to store all our configs.

  - `:Ex` > `d` > `folder name(configs)`
  - Go inside the configs folder and create a new file `init.lua`
  - To create new file via vim press `%` in the netrw and enter the file name.

## Create remaps

To get started with nvim without any hassle, let's first set up some remaps for ease of use.

- Create a new file `remap.lua` inside configs folder.
- Include it in the `/configs/init.lua` with the following line:

```lua[init.lua]
require("configs.remap")
```

- In the `remap.lua` file, add your first remap to open the file explorer without typing the `:Ex` command:

```lua[remap.lua]
  vim.g.mapleader = " "
  vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)
```

:::md-alert{type="success"}
#content
Now, you can simply press space + p + v to open the file explorer.
:::

# Plugin manager

:::md-alert{type="success"}
#content
We will be using [**Packer**](https://github.com/wbthomason/packer.nvim){:target="\_blank"} for plugin managment.
:::

### Get Packer

> Refer to [Packer on github](https://github.com/wbthomason/packer.nvim){:target="\_blank"} for more installation options.

```bash
git clone --depth 1 https://github.com/wbthomason/packer.nvim\
 ~/.local/share/nvim/site/pack/packer/start/packer.nvim
```

### Create packer config file:

- Create a `packer.lua` file inside the `/lua/configs` folder and paste the following lines from the docs:

```lua
vim.cmd [[packadd packer.nvim]]

return require('packer').startup(function(use)
  -- Packer can manage itself
  use 'wbthomason/packer.nvim'
end)
```

- Save the file and close vim using the `:wq` command.
- Open nvim again, navigate to the `packer.lua` file, and execute `:so` to source the file.

- You have successfully installed packer.

:::md-alert{type="success"}
#content
Do a `:PackerSync` to confirm your install
:::

# Fuzzy Finder

Let's get you a fuzzy finder to help you navigate through files swiftly and easily.

:::md-alert{type="success"}
#content
My personal favorite is `Telescope`.
:::

### Setup Telescope using Packer

So, we'll be setting up telescope using packer.

- Add the following line in the packer.lua file:

```lua
use {
  'nvim-telescope/telescope.nvim', tag = '0.1.6',
-- or                            , branch = '0.1.x',
  requires = { {'nvim-lua/plenary.nvim'} }
}
```

### Create Remaps for Telescope

Follow this sequence:

`space + p + v` > Go to root (nvim folder) > `d` to create a folder named `after` > Inside `after` `d` to create another folder named `plugin` > Inside `plugin` `%` to create a new file `telescope.lua`
<br>

- Paste these 2 lines in telescope.lua file:

```js[telescope.lua]
local builtin = require('telescope.builtin')
vim.keymap.set('n', '<leader>pf', builtin.find_files, {})
```

:::md-alert{type="success"}
#content
You have successfully installed a fuzzy finder. To open it, just press space + p + f.
:::

#### Preview:

![Fuzzy Finder](/codelabs/neovim-essentials/telescope.png)

# Color Scheme

There are thousands of color schemes available, and you can choose any that you prefer. For this guide, I will use `Catppuccin` because it offers excellent default settings.

### Install Cattppuccin

- Add this packer statement in the `/configs/packer.lua` file:

```lua[packer.lua]
use { "catppuccin/nvim", as = "catppuccin" }
```

- Execute `:so` followed by `:PackerSync` in your editor to install Catppuccin.

### Configure Catppuccin

- Create a new file named `catppuccin.lua` in the `/after/plugin` folder.
- Insert the following lines into the file:

```lua
require("catppuccin").setup({
    flavour = "mocha",
    transparent_background = true,
    integrations = {
        cmp = true,
        gitsigns = true,
        nvimtree = true,
        treesitter = true,
        notify = false,
        mini = {
            enabled = true,
            indentscope_color = "",
        },
    }
})
```

- Save the file and execute `:so` to source the file.

:::md-alert{type="success"}
#content
There you have it, a colorscheme for your editor.
:::

# Treesitter

:::md-alert{type="success"}
#content
Now that we have colors set up, there's still one piece missing—Treesitter.
:::
<br>
If you're not familiar with Treesitter, it is a tool that allows for incremental parsing of the code in your editor, providing a richer and more accurate code editing experience.

```lua
use('nvim-treesitter/nvim-treesitter', {run = ':TSUpdate'})
```

### Configure Treesitter

- Create a new file in `/after/plugin` folder named `treesitter.lua`
- Insert the following configuration lines:

```lua
require'nvim-treesitter.configs'.setup {
  ensure_installed = { "c", "javascript", "typescript", "rust" }, -- Add your languages here
  sync_install = false,
  auto_install = true,
  highlight = {
    enable = true,
    additional_vim_regex_highlighting = false,
  },
}
```

- Save the file and do an `:so`.
  <br>
  You will then see Treesitter automatically begin installing parsers for the specified languages, as shown in the screenshot below:
  ![Treesitter](/codelabs/neovim-essentials/treesitter.png)

:::md-alert{type="success"}
#content
Congratulations! You have successfully installed and configured Treesitter in your editor.
:::

# LSP

With the color scheme and Treesitter in place, the next component is the Language Server Protocol (LSP).

### Install

To install, simply paste the following Packer statements into your `packer.lua` file:

```lua
use {
  'VonHeikemen/lsp-zero.nvim',
  branch = 'v3.x',
  requires = {
    --- Uncomment the two plugins below if you want to manage the language servers from neovim
    -- {'williamboman/mason.nvim'},
    -- {'williamboman/mason-lspconfig.nvim'},

    {'neovim/nvim-lspconfig'},
    {'hrsh7th/nvim-cmp'},
    {'hrsh7th/cmp-nvim-lsp'},
    {'L3MON4D3/LuaSnip'},
  }
}

use {
    "williamboman/mason.nvim",
    "williamboman/mason-lspconfig.nvim",
    "neovim/nvim-lspconfig",
}
```

- Execute `:so` followed by `:PackerSync`. Voilà, you have installed everything needed for your LSP.

### Configure LSP

For a basic LSP setup, copy and paste these lines into the `/after/plugin/lsp.lua` file

```lua
local lsp_zero = require('lsp-zero')

lsp_zero.on_attach(function(client, bufnr)
  lsp_zero.default_keymaps({buffer = bufnr})
end)
 local cmp = require('cmp')
 cmp.setup({
         snippet = {
             expand = function(args)
               require('luasnip').lsp_expand(args.body) -- For `luasnip` users.
           end,
       },
       mapping = cmp.mapping.preset.insert({
             ['<C-p>'] = cmp.mapping.select_prev_item(cmp_select),
           ['<C-n>'] = cmp.mapping.select_next_item(cmp_select),
           ['<C-y>'] = cmp.mapping.confirm({ select = true }),
           ["<C-Space>"] = cmp.mapping.complete(),
       }),
       sources = cmp.config.sources({
             { name = 'nvim_lsp' },
           { name = 'luasnip' }, -- For luasnip users.
       }, {
             { name = 'buffer' },
       })
   })

require('mason').setup({})
require('mason-lspconfig').setup({
  -- Replace the language servers listed here
  -- with the ones you want to install
  ensure_installed = {'tsserver'},
  handlers = {
    function(server_name)
      require('lspconfig')[server_name].setup({})
    end,
  }
})
```

:::md-alert{type="success"}
#content
Your basic lsp setup is ready.
:::

#### Customizations

- You can add more language servers via `:Mason`
- Basic key bindings are included, which you can customize or extend via the `mapping` object in the cmp setup.

# Editor Settings

These are some of the editor settings inspired by ThePrimeagen that I use and recommend.

- Copy paste these in `/lua/configs/set.lua`
- Save and do an `:so`

```lua[set.lua]
vim.opt.guicursor = ""

vim.opt.nu = true
vim.opt.relativenumber = true

vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true

vim.opt.smartindent = true

vim.opt.wrap = false

vim.opt.swapfile = false
vim.opt.backup = false
vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir"
vim.opt.undofile = true

vim.opt.hlsearch = false
vim.opt.incsearch = true

vim.opt.termguicolors = true

vim.opt.scrolloff = 8
vim.opt.signcolumn = "yes"
vim.opt.isfname:append("@-@")

vim.opt.updatetime = 50

vim.opt.colorcolumn = "80"
```

# Optinal Remaps

Here are some additional remaps inspired by ThePrimeagen:

- Paste these in `remap.lua` file.

```lua
vim.g.mapleader = " "
vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)

vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")

vim.keymap.set("n", "J", "mzJ`z")
vim.keymap.set("n", "<C-d>", "<C-d>zz")
vim.keymap.set("n", "<C-u>", "<C-u>zz")
vim.keymap.set("n", "n", "nzzzv")
vim.keymap.set("n", "N", "Nzzzv")

vim.keymap.set("x", "<leader>p", [["_dP]])

-- System Clipboard ones
vim.keymap.set({"n", "v"}, "<leader>y", [["+y]])
vim.keymap.set("n", "<leader>Y", [["+Y]])

vim.keymap.set({"n", "v"}, "<leader>d", [["_d]])

vim.keymap.set("n", "<leader>f", vim.lsp.buf.format)

vim.keymap.set("n", "<C-k>", "<cmd>cnext<CR>zz")
vim.keymap.set("n", "<C-j>", "<cmd>cprev<CR>zz")
vim.keymap.set("n", "<leader>k", "<cmd>lnext<CR>zz")
vim.keymap.set("n", "<leader>j", "<cmd>lprev<CR>zz")

vim.keymap.set("n", "<leader>x", "<cmd>!chmod +x %<CR>", { silent = true })

vim.keymap.set("n", "<leader><leader>", function()
    vim.cmd("so")
end)
```

For detailed explanation, you can refer to [This video](https://www.youtube.com/watch?v=w7i4amO_zaE)

# Conclusion

Congratulations on setting up your **Neovim editor**! This basic configuration is just the beginning—Neovim's true potential lies in **customization**. **Tailor your setup** by exploring different **plugins** and tweaking the settings to fit your **workflow**. The extensive **Neovim community** offers numerous **resources**, **tutorials**, and **forums** to help you expand your configuration and solve any challenges you might encounter.
<br>
**Dive deeper**, **customize freely**, and create an editor that enhances your **productivity** and suits your **coding style** perfectly. Keep **learning** and **adapting** your environment to make the most out of Neovim's powerful features.
