const fs = require('fs');

module.exports = {

  getNavbar() {
    try {
      return JSON.parse(fs.readFileSync('./storage/menu.json').toString());
    } catch(error) {
      console.error(error);
      return [];
    }
  },

  auth(req, res, next) {
    if (!req.session.isLoggedIn) {
      return res.redirect("/login");
    }
    next();
  },

  updateMenu(url, newUrl, text) {
    const menuFile = './storage/menu.json';
    if (!fs.existsSync(menuFile)) {
      fs.writeFileSync(menuFile, JSON.stringify([]));
    }
    const menu = JSON.parse(fs.readFileSync(menuFile).toString());
    if (menu.filter(i => i.url == url).length < 1) {
      menu.push({
        text,
        url: newUrl
      });
    } else {
      menu.forEach(i => {
        if (i.url == url) {
          i.url = newUrl;
          i.text = text;
        }
      });
    }
    fs.writeFileSync(menuFile, JSON.stringify(menu));
  },

  deleteFromMenu(url) {
    const menuFile = './storage/menu.json';
    if (!fs.existsSync(menuFile)) {
      return;
    }
    const menu = JSON.parse(fs.readFileSync(menuFile).toString());
    if (menu.filter(i => i.url == url).length < 1) {
      return;
    } else {
      menu.forEach((item, index) => {
        if (item.url == url) {
          menu.splice(index, 1); 
        }
      });
    }
    fs.writeFileSync(menuFile, JSON.stringify(menu));
  },

  index(res, body, prepend = '') {
    const menu = this.getNavbar();
    if (menu.length) {
      res.redirect(prepend + menu[0].url);
    } else {
      res.render('index', {
        title: 'Inicio',
        body: body
      });
    }
  }
};
