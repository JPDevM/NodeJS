import chalk from 'chalk'; // Terminal colors

/* Documentation: https://developers.google.com/web/tools/puppeteer */

const scrapeLogin = async (pageInstance) => {
  const userName = 'david@dutygestion.com';
  const password = 'david@dutygestion.com';

  await pageInstance.waitForSelector('.contenedor-login');

  // Write username
  await pageInstance.type('input[name=username]', userName);

  // Write password
  await pageInstance.type('input[name=password]', password);
  console.log(
    chalk.green(`✅ Write user:${userName} and password:${password}`)
  );

  // Click checkbox
  await pageInstance.waitFor(2000); // Particularity of the web
  await pageInstance.click('input#checkTerminos');

  // Click submit button
  await pageInstance.click(
    'button.btn.btn-block.btn-lg.btn-primary.mt-lg.contenido.track901.ng-scope'
  );
  console.log(chalk.green(`✅ Submit`));

  // Select enviroment -> Duty O.R. España
  await pageInstance.waitForSelector('.entorno-gran-container');

  const options = await pageInstance.$$('.ng-binding');

  /* Cambio de navegación To-Do
     1 -> flowick
     2 -> luminotecnia
     3 -> dutymanagerai
     4 -> tentohelados
     5 -> dutyesp
     6 -> ??
     7 -> ??
     8 -> ??
     9 -> ??
     10 -> ??
     11 -> ??
     12 -> ??
     13 -> tentohelados
     14 -> dutyesp
  */
  //  console.log(chalk.blue(await options[1].textContent)); Quiero ver si puedo ver el contenido de la lista de entornos
  await options[14].click();

  await pageInstance.waitForNavigation();

  // Rest of code here! 🚀

  // Select Menú -> Duty O.R. España
  await pageInstance.waitForSelector('.xx'); // Menú /html/body/div[2]/aside/div/div[2]/nav/ul
  
  // Select Auditorias -> Duty O.R. España
  const auditoriasMenu = await pageInstance.$$('.xx'); // Auditorias /html/body/div[2]/aside/div/div[2]/nav/ul/li[6]/a
  // Click en Auditorís
  await options[14].click();


  await pageInstance.waitForNavigation(); // Cambiar
};

export { scrapeLogin };
