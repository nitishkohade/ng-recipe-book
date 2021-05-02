// When you import a module you usually use a reference to the module class:

// @NgModule({
//     providers: [AService]
// })
// export class A {}

// -----------------------------------

// @NgModule({
//     imports: [A]
// })
// export class B
// In this way all providers registered on module A will be added to the root injector and available for the entire application.

// But there is another way to register a module with providers like this:

// @NgModule({
//     providers: [AService]
// })
// class A {}

// export const moduleWithProviders = {
//     ngModule: A,
//     providers: [AService]
// };

// ----------------------

// @NgModule({
//     imports: [moduleWithProviders]
// })
// export class B
// This has the same implications as the previous one.

// You probably know that lazy loaded modules have their own injector. So suppose you want to register AService to be available for the entire application, but some BService to be available to only lazy loaded modules. You can refactor your module like this:

// @NgModule({
//     providers: [AService]
// })
// class A {}

// export const moduleWithProvidersForRoot = {
//     ngModule: A,
//     providers: [AService]
// };

// export const moduleWithProvidersForChild = {
//     ngModule: A,
//     providers: [BService]
// };

// ------------------------------------------

// @NgModule({
//     imports: [moduleWithProvidersForRoot]
// })
// export class B
    
// // lazy loaded module    
// @NgModule({
//     imports: [moduleWithProvidersForChild]
// })
// export class C
// Now BService will only be available for child lazy loaded modules and AService will be available for the entire application.