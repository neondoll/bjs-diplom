// -----------------------------------
// Выход из личного кабинета
// -----------------------------------

const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

// -----------------------------------
// Получение информации о пользователе
// -----------------------------------

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// -----------------------------------
// Получение текущих курсов валюты
// -----------------------------------

const ratesBoard = new RatesBoard();

ratesBoard.getStocks = function () {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      this.clearTable();
      this.fillTable(response.data);
    }
  });
};

ratesBoard.getStocks();

setInterval(ratesBoard.getStocks.bind(ratesBoard), 60000);

// -----------------------------------
// Операции с деньгами
// -----------------------------------

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (response) => {
    const isSuccess = response.success;

    if (isSuccess) {
      ProfileWidget.showProfile(response.data);
    }

    this.setMessage(isSuccess, isSuccess ? "Успех!" : response.error);
  });
};

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (response) => {
    const isSuccess = response.success;

    if (isSuccess) {
      ProfileWidget.showProfile(response.data);
    }

    this.setMessage(isSuccess, isSuccess ? "Успех!" : response.error);
  });
};

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (response) => {
    const isSuccess = response.success;

    if (isSuccess) {
      ProfileWidget.showProfile(response.data);
    }

    this.setMessage(isSuccess, isSuccess ? "Успех!" : response.error);
  });
};

// -----------------------------------
// Работа с избранным
// -----------------------------------

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (response) => {
    const isSuccess = response.success;

    if (isSuccess) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }

    this.setMessage(isSuccess, isSuccess ? "Успех!" : response.error);
  });
};

favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    const isSuccess = response.success;

    if (isSuccess) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }

    this.setMessage(isSuccess, isSuccess ? "Успех!" : response.error);
  });
}
