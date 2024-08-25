# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
    -   [Useful resources](#useful-resources)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

-   View the optimal layout for each page depending on their device's screen size
-   See hover states for all interactive elements on the page
-   See their own IP address on the map on the initial page load
-   Search for any IP addresses or domains and see the key information and location

### Screenshot

![](./image.png)

### Links

-   Live Site URL: [https://ip-tracker-zeta-rosy.vercel.app/](https://ip-tracker-zeta-rosy.vercel.app/)

## My process

### Built with

-   Semantic HTML5 markup
-   CSS custom properties
-   CSS Grid
-   Mobile-first workflow

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<form id="form">
    <input
        id="customIP"
        name="customIP"
        pattern="^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
        type="text"
        required
        title="Enter IP Address"
        placeholder="Search for any IP address or domain" />
    <button type="submit" title="Submit">
        <img src="./assets/images/icon-arrow.svg" alt="" />
    </button>
</form>
```

```css
input {
    padding: 1rem;
    border-radius: 1rem 0 0 1rem;
    border: none;
    cursor: pointer;
    width: 100%;
    outline: none;

    &:focus {
        border: 2px solid rgb(0, 140, 255);
    }

    &:user-invalid {
        border: 1px solid red;
        color: red;
        outline: none;
        & + button {
            background-color: rgb(179, 15, 15);
        }
    }
}

button {
    padding: 1rem;
    border-radius: 0 1rem 1rem 0;
    border: none;
    background-color: black;
    cursor: pointer;

    &:hover {
        background-color: var(--very-dark-gray);
    }
}
```

```js
const getInfo = async (ipAddress = null) => {
    let url =
        "https://geo.ipify.org/api/v2/country,city?apiKey=at_qt63kKKXxEiUXOd5PKf3Z0vfaW6wu";
    if (ipAddress) {
        url += `&ipAddress=${ipAddress}`;
    }
    const data = await fetchData(url);
    const { lat, lng, timezone, city, region, postalCode } = data.location;
    const { ip, isp } = data;
    updateData(ip, isp, city, region, timezone, postalCode);
    updateMap(lat, lng);
};
```

## Author

-   Website - [Dylan Heslop](https://github.com/dylan-dot-c)
-   Frontend Mentor - [@dylandotc](https://www.frontendmentor.io/profile/dylandotc)
