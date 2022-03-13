const scrapeLogin = async (pageInstance) => {
  await pageInstance.waitForSelector(".contenedor-login");

  // Write username
  await pageInstance.type("input[name=username]", "david@dutygestion.com");

  // Write password
  await pageInstance.type("input[name=password]", "david@dutygestion.com");

  // Click checkbox
  await pageInstance.waitFor(2000);
  await pageInstance.click("input#checkTerminos");

  // Click submit button
  await pageInstance.click(
    "button.btn.btn-block.btn-lg.btn-primary.mt-lg.contenido.track901.ng-scope"
  );

  await pageInstance.waitForSelector(".entorno-gran-container");

  const options = await pageInstance.$$(".entorno-container.ng-scope");
  await options[14].click();

  await pageInstance.waitForNavigation();

  // Rest of code here! 🚀
};

export { scrapeLogin };
