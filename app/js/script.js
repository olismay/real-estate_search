const itemsList = document.getElementById('developments-list');
const searchInput= document.getElementById('search-input');
let devItems = [];



searchInput.addEventListener('keyup', (e) => {
    //tracking case insensitive user input
    const searchStr = e.target.value.toLowerCase();

    if (searchStr.split('').length >= 3) {
        const filteredItems = devItems.filter( item => {
            return (
                item.title.toLowerCase().includes(searchStr)
            );
        });
        showItems(filteredItems);
    } else {
        getItems();
    }

   
});

//getting data using fetch API
const getItems = async () => {
    try {
        const resp = await fetch('https://603e38c548171b0017b2ecf7.mockapi.io/homes');
        devItems = await resp.json();
        showItems(devItems);        
    } catch (err) {
        console.error(err);
    }
};

const showItems = (items) => {
    const str = items
         .map((item) => {
            return `
                <li class="developments__item">
                    <a class="developments__link" href="#">
                        <img class="developments__pic" alt="item" src="./img/item.jpg">                       
                        <div class="developments__wrapper">                          
                           <div class="developments__wrapper--address">
                           <span class="developments__type">${item.type}</span>
                            <h3 class="developments__title" id="title">${item.title}</h3>
                            <div class="developments__address">${item.address}</div>
                          </div>
                          <div class=" developments__price--wrapper">
                            <div class="developments__price">New Properties for Sale from 
                              <b>£</b>
                              <span class="developments__price--amount">${item.price}</span>
                            </div>
                            <span class="developments__custom-option">Shared Ownership Available</span>
                          </div>
                        </div>
                    </a>
                </li>`;})            
            .join('');                
    itemsList.innerHTML = str;
};

getItems();


