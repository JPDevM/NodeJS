let divPreview = document.querySelector('#divPreview');

let newPreview = `
                <!-- Preview -->
                <div class="col-12">
                  <p class="text-white-50 mb-0 mt-4 text-uppercase"><small>Preview</small></p>
                </div>

                <div class="col-12">
                  <div class="row px-3">

                    <div class="col-12 border border-dark rounded pb-2">
                      <nav id="previewNavbar" class="navbar navbar-dark bg-dark text-white p-0">
                        <small>
                          <i class="fa fa-circle" aria-hidden="true"></i>
                          <i class="fa fa-circle" aria-hidden="true"></i>
                          <i class="fa fa-circle-thin" aria-hidden="true"></i>
                          <i class="fa fa-wifi" aria-hidden="true"></i>
                        </small>
                        <span class="navbar-text text-truncate text-white py-0">
                          <small>02:30 AM </small>
                        </span>
                        <small>
                          100
                          <i class="fa fa-battery-half" aria-hidden="true"></i>
                        </small>
                      </nav>

                      <nav id="previewMenu" class="navbar navbar-dark bg-dark">
                        <a class="navbar-brand text-white-50" href="/setting.html">
                          <i class="fa fa-cog" aria-hidden="true"></i>
                        </a>
                        <span class="navbar-text text-white text-truncate">
                          My subscriptions
                        </span>
                        <a class="navbar-brand text-white-50" href="/add_existing.html"><i class="fa fa-plus"
                            aria-hidden="true"></i></a>
                      </nav>

                      <!-- Card -->
                      <div id="previewCard">
                        <div id="cardRow" class="row mx-0">

                          <div class="col-2">
                            <i id="cardLogo" class="fa fa-home my-2">
                            </i>
                          </div>

                          <div id="cardUserCenter" class="col-6">
                            <div class="row">
                              <div class="col-12">
                                <p class="my-0 text-truncate">
                                  <strong>Renting</strong>
                                </p>
                              </div>
                              <div class="col-12">
                                <p class="my-0 text-truncate">
                                  <small>To Jonh Doe</small>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div id="cardUserRight" class="col">
                            <div class="row">
                              <div class="col-12">
                                <p class="text-right my-0 text-truncate">
                                  <strong>400 €</strong>
                                </p>
                              </div>
                              <div class="col-12">
                                <p class="text-right my-0 text-truncate">12 days</p>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>


                  </div>
                </div>
                  `;
if (divPreview !== null) {
  divPreview.insertAdjacentHTML('beforeend', newPreview);
}
