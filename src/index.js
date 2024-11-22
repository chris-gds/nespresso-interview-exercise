import '@/styles/index.scss'

document.addEventListener('DOMContentLoaded', function () {
  const randomId = Math.floor(Math.random() * 50) + 1;

  fetch(`https://dummyjson.com/products/${randomId}`)
    .then(response => response.json())
    .then(data => {
      const descriptionContent = document.getElementById('tabpanel-1');
      const detailsTab = document.getElementById('tab-2');
      const descriptionTab = document.getElementById('tab-1');
      const descriptionTabContent = document.querySelector('#tabpanel-1');
      const detailsTabContent = document.querySelector('#tabpanel-2');

      descriptionContent.innerHTML = `<p>${data.description}</p>`;

      descriptionTab.addEventListener('click', function () {
        descriptionTab.setAttribute('aria-selected', 'true');
        detailsTab.setAttribute('aria-selected', 'false');
        descriptionTabContent.classList.remove('is-hidden');
        detailsTabContent.classList.add('is-hidden');
      });

      detailsTab.addEventListener('click', function () {
        detailsTab.setAttribute('aria-selected', 'true');
        descriptionTab.setAttribute('aria-selected', 'false');
        detailsTabContent.classList.remove('is-hidden');
        descriptionTabContent.classList.add('is-hidden');

        detailsTabContent.innerHTML = `
                   <p><strong>Dimensions:</strong></p>
                    <ul>
                      <li><strong>Width:</strong> ${data.dimensions.width || 'Not available'} cm</li>
                      <li><strong>Height:</strong> ${data.dimensions.height || 'Not available'} cm</li>
                      <li><strong>Depth:</strong> ${data.dimensions.depth || 'Not available'} cm</li>
                    </ul>
                  <p><strong>Return Policy:</strong> ${data.returnPolicy || 'Not available'}</p>
              `;
      });

      descriptionTab.setAttribute('aria-selected', 'true');
      descriptionTabContent.classList.remove('is-hidden');
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

// WC3 pattern
class TabsAutomatic {
  constructor(groupNode) {
    this.tablistNode = groupNode;

    this.tabs = [];

    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];

    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    this.setSelectedTab(this.firstTab, false);
  }

  setSelectedTab(currentTab, setFocus) {
    if (typeof setFocus !== 'boolean') {
      setFocus = true;
    }
    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        this.tabpanels[i].classList.remove('is-hidden');
        if (setFocus) {
          tab.focus();
        }
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
        this.tabpanels[i].classList.add('is-hidden');
      }
    }
  }

  setSelectedToPreviousTab(currentTab) {
    var index;

    if (currentTab === this.firstTab) {
      this.setSelectedTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index - 1]);
    }
  }

  setSelectedToNextTab(currentTab) {
    var index;

    if (currentTab === this.lastTab) {
      this.setSelectedTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.setSelectedToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.setSelectedToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.setSelectedTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.setSelectedTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].automatic');
  for (var i = 0; i < tablists.length; i++) {
    new TabsAutomatic(tablists[i]);
  }
});
