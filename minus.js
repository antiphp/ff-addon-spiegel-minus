(() => {
  const message = console.log

  function* getIcons() {
    message("-> getIcons()")
    for (let element of document.getElementsByTagName("g")) {
      if (element.id.indexOf("-splus-flag-") !== 1) {
        continue
      }
      if (element.offsetParent === null) {
        // not visible
        continue
      }

      yield {
        element: element,
        icon: element,
      }
    }
  }

  function* getArticles(icons) {
    message("-> getArticles()")
    for (let icon of icons) {
      let element = icon.icon
      let steps = 0
      let found = true
      do {
        element = element.parentNode
        if (steps++ > 15) {
          found = false
        }
      } while (element.tagName.toUpperCase() !== "ARTICLE")
      if (!found) {
        continue
      }
      // if (!isElementInViewport(element)) {
      //   continue
      // }
      yield Object.assign(icon, {
        element: element,
        article: element,
      })
    }
  }

  function processArticles(articles) {
    message("-> processArticles()")
    for (let article of articles) {
      processArticle(article)
    }
  }

  function processArticle(article) {
    let size = article.element.getBoundingClientRect()

    let element = document.createElement("div")
    element.className = "sminus"
    element.innerText = article.icon.id + " // " + article.element.id
    element.onclick = element.remove
    element.style = [
      "position: absolute",
      "z-index: 9999",
      "top: " + size["top"] + "px",
      "left: " + size["left"] + "px",
      "height: " + size["height"] + "px",
      "width: " + size["width"] + "px",
      "background: red",
      "opacity: 0.5",
    ].join(";")
    document.body.appendChild(element)
  }

  function run() {
    removeProcessed()
    processArticles(getArticles(getIcons()))
  }

  function removeProcessed() {
    for (let element of document.getElementsByClassName("sminus")) {
      element.remove()
    }
  }

  // document.addEventListener('scroll', function (e) {
  //   run()
  // })
  run()

  // ---

  // https://stackoverflow.com/a/7557433
  function isElementInViewport(el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
  }
})()