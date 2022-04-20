# Athlet mobile

> An application for street athletes to keep their training journal, 
> with the ability to create their own exercises and workouts.
> 
> The idea is to make a social network for people involved in sports, 
> everyone can create a workout just for themselves or give everyone 
> the opportunity to train on it.

<br />

## In project i'm using

[```react-native```](https://yandex.ru) - Framework for building cross-platform mobile applications

[```recoil```](https://yandex.ru) - Atomic state managment library

[```react-native-reanimated```](https://yandex.ru) & [```react-native-gesture-handler```](https://yandex.ru) - Libraries for creating awesome animations

<br />

## Architecture (usage scheme)

![Usage scheme](/doc/use-scheme.png)

<br />

### **UI LAYER**

```UI``` - all visible to the user interfaces

```UI Store``` - storage for specific ui components (access ui only)

```UI Controller``` - ui logic and interactions with storage (access ui only). For more complicated things uses ```Service```

<br />

### **BUSINESS LAYER**

```Store``` - global application storage (everyone can access)

```Service``` - keeps application business logic (can communicate only with global storage, **not ui!**)

```Repository``` - using for communicate with api

<br />

### **!TODO**

UI can subscribe to store and rerenders when it changed. **Controllers** and **Services** must be independent from store changes, else ui will be unnecessary rerendered. In the react paradigm we have only:

```const [value, setValue] = React.useState()```

But in that case, if our controllers and services wants to use some storage information, ui will be rerendered, depends on which values they using. But if we will have:

```const [value, setValue, getValue] = React.useState()```

The ```getValue``` method which will be have unique reference between state changes, the controllers and services become imdependent from store changes.

This issue i fixed with ```useGetRecoilState``` hook (for some reasons, he has a bag, but i wrote a patch and its work fine), which return the getter for access to store value without subscribing to it.

