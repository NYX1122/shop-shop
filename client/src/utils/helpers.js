export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    //Request access to indexedDatabase shop-shop
    const request = window.indexedDB.open('shop-shop', 1);

    let db, tx, store;

    //Incase indexedDatabase doesn't exist yet.
    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    //Error catcher incase requesting has an error
    request.onerror = function(e) {
      console.log('There was an error');
    };

    //If the request was successful in accessing / creating database, this function runs.
    request.onsuccess = function(e) {
      //Variable to hold the returned database
      db = request.result;

      //Variable to that opens and hold new transaction that is given readwrite permission.
      tx = db.transaction(storeName, 'readwrite');

      //Variable that decides which object store to change with the transaction.
      store = tx.objectStore(storeName);

      //Error catcher incase something went wrong with opening the transaction.
      db.onerror = function(e) {
        console.log('error', e);
      };

      //Switch to decide which method will be used in the transaction.
      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      //Closes database after transaction resolves.
      tx.oncomplete = function() {
        db.close();
      };
    }
  });
}