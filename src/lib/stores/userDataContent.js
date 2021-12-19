import { writable } from 'svelte/store'
import { browser } from "$app/env";

export const content  = writable({});

if(browser) {
    console.log('isbrowser');
    const userDataFromLocalStorage = localStorage.getItem("user_data");
    console.log(userDataFromLocalStorage);
    if(userDataFromLocalStorage) {
        content.set(JSON.parse(userDataFromLocalStorage));
        console.log('set user data ');
    }
    content.subscribe((value) => localStorage.setItem("user_data", JSON.stringify(value)));    
} else {
    console.log('no browser');
}