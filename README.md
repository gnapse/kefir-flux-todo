Kefir-based Flux architecture (Proof of concept)
================================================

This is a sample Todo-List app developed using [React][] and a [Flux][]-like
architecture based on [Kefir][]'s [FRP][] streams (aka **Keflux**).  It
features the use of [Immutable][] data structures.

Surprisingly, this app mimics the [Todo-MVC][] app traditionally used to
showcase how things are done in different front-end javascript frameworks.

Thanks to the [react-hot-boilerplate][] project, that served as a base for this
app.

[React]: https://facebook.github.io/react/
[Flux]: https://facebook.github.io/flux/
[Kefir]: https://rpominov.github.io/kefir/
[FRP]: https://en.wikipedia.org/wiki/Functional_reactive_programming
[Immutable]: https://facebook.github.io/immutable-js/
[Todo-MVC]: http://todomvc.com/
[react-hot-boilerplate]: https://github.com/gaearon/react-hot-boilerplate

## Usage

```
npm install
npm start
open http://localhost:3000
```

## Highlights

The core of the concept is encapsulated in a small internal library called
**Keflux**, located in `src/lib/keflux.js`.  It is based on [this github
project][], but with some common patterns extracted and unified for a simpler
use.

[this github project]: https://github.com/lapanoid/react-kefir-flux/

To really understand what this Kefir+Flux concept is all about, take a look at
the Flux-like stores in `src/stores/`.  Also take a look at the use of these
store actions within the components.

There's a store based on local storage, which is used by default for
simplicity, and another one using a backend json api service, to show how the
concept can be adapted to use a more real-life scenario (ajax backend) without
modifying the front-end at all.

If you're not familiar with Kefir, [RxJS][]/[ReactiveX][], [Bacon.js][], or
some other FRP library, then this concept might not be clear at first sight.

[RxJS]: https://reactive-extensions.github.io/RxJS/
[ReactiveX]: http://reactivex.io
[Bacon.js]: https://baconjs.github.io/

## What's next

This is a list of features that have not been explored or implemented yet.

* Error handling.
* Registering callbacks to handle action completion.
* Mixin for easing the access to stores/actions in components via [React contexts][].

[React contexts]: https://blog.jscrambler.com/react-js-communication-between-components-with-contexts/

## Related projects

* [react-kefir-flux](https://github.com/lapanoid/react-kefir-flux/)
* [react-rxjs-todomvc](https://github.com/fdecampredon/react-rxjs-todomvc)
* [reactive-flux](https://github.com/codesuki/reactive-flux)
* [ffux](https://github.com/milankinen/ffux)

## Dependencies

* React
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* [Kefir](https://rpominov.github.io/kefir/)
* [Immutable](https://facebook.github.io/immutable-js/)
* [axios](https://github.com/mzabriskie/axios) for ajax requests.
