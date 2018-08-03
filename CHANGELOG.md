# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

## [0.4.0] - 2018-08-03

### Added

* Added ability to specify default properties through `makeModel`

### Removed

* `Model.withMutations`
* `Model.clone`
* `Lens.withMutations`

## [0.3.2] - 2018-04-03

### Fixed

* Fixed return type for `Model.throughLens`
  * This only affects the TypeScript declarations

## [0.3.1] - 2018-04-03

### Fixed

* Added missing export for lenses

## [0.3.0] - 2018-04-03

### Added

* Added support for lensing
  * `makeLens` will create a lens to view a model through
  * `Lens.with` will immutably update the underlying model
  * `Lens.withMutations` will update the underlying model in-place
  * `Lens.removeLens` will remove the lens, returning the backing model. For use with `Lens.with`

## [0.2.1] - 2018-03-23

### Changed

* `Model.clone` now uses a proper deep-clone
* Properties on models are now readonly to discourage and partially prevent mutation outside of `withMutations`

## [0.2.0] - 2018-03-23

### Added

* `Model.clone`

### Changed

* Renamed `Model.mutate` to `Model.withMutations`

## [0.1.2] - 2018-03-23

### Fixed

* Forgot to build before the last release :persevere:

## [0.1.1] - 2018-03-23

### Fixed

* Disabled Immer's auto-freezing so that `Model.mutate` can be called after `Model.with`

## [0.1.0] - 2018-03-22

### Added

* `Model.mutate`

## [0.0.4] - 2018-03-22

### Added

* Include top-level `index.d.ts`

## [0.0.3] - 2018-03-22

### Changed

* Modified files included in the package

## [0.0.2] - 2018-03-22

### Added

* Include generated TypeScript declaration files

## [0.0.1] - 2018-03-22

### Added

* `Model`
* `makeModel`

[unreleased]: https://github.com/maxdeviant/figurine/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/maxdeviant/figurine/compare/v0.3.2...v0.4.0
[0.3.2]: https://github.com/maxdeviant/figurine/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/maxdeviant/figurine/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/maxdeviant/figurine/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/maxdeviant/figurine/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/maxdeviant/figurine/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/maxdeviant/figurine/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/maxdeviant/figurine/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/maxdeviant/figurine/compare/v0.0.4...v0.1.0
[0.0.4]: https://github.com/maxdeviant/figurine/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/maxdeviant/figurine/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/maxdeviant/figurine/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/maxdeviant/figurine/compare/166f623...v0.0.1
