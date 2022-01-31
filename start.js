const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);

app.get('/api/settings', (req, res) => {
  res.send(
    {
      "store": [
        {
          "id": "1",
          "code": "a1",
          "name": "Максимальное количество за период",
          "value": 100,
          "unit": "шт."
        },
        {
          "id": "2",
          "code": "a2",
          "name": "Максимальная сумма за период",
          "value": 10000,
          "unit": "р."
        }
      ],
      "guest": [
        {
          "id": "3",
          "code": "a3",
          "name": "Минимальная количество за период",
          "value": 1000,
          "unit": "шт."
        },
        {
          "id": "4",
          "code": "a4",
          "name": "Минимальная сумма за период",
          "value": 10000,
          "unit": "р."
        }
      ],
      "price": [
        {
          "id": "5",
          "code": "a5",
          "name": "Максимальная стоимость",
          "value": 3000,
          "unit": "р."
        },
        {
          "id": "6",
          "code": "a6",
          "name": "Коэффициент",
          "value": 20,
          "unit": "%"
        },
        {
          "id": "7",
          "code": "a7",
          "name": "Минимальная стоимость ",
          "value": 1000,
          "unit": "р."
        }
      ]
    }
  )
})
app.get('/api/refbook/feature-toggle', (req, res) => {
  res.send(
    [
      {"name": "test", "enabled": false},
      {"name": "feature", "enabled": true}
    ]
  )
})
app.get('/api/report-service/reports', (req, res) => {
  res.send(
    [
      {
        "name": "Показатели загруженности",
        "code": "rep.1.1",
        "online": true

      },
      {
        "name": "Статистика обращений",
        "code": "rep.2.1",
        "online": false
      }
    ]
  )
})
app.get('/api/user', (req, res) => {
  res.send(
    {
      "id": "b66cecdc-7877-4915-a234-fda81260804e",
      "lastName": "Kot",
      "firstName": "Alex",
      "enabled": true
    }
  )
})
app.get('/api/store/search', (req, res) => {
  res.send( {
    "content": [
      {
        "id": 1,
        "no": 2,
        "sapId": "1",
        "mdmId": "1",
        "clusterId": 1,
        "clusterMdmId": "1",
        "clusterName": "Кластер ",
        "clusterSapId": "D",
        "divisionCode": "Y",
        "divisionName": "Северо-Запад",
        "divisionSapId": null,
        "divisionMdmId": "1",
        "macroRegionId": 1,
        "macroName": "Северо-Запад",
        "macroSapId": "a",
        "macroMdmId": "a",
        "address": "Мурманская обл, Печенгский р-н",
        "format": "a",
        "status": "a",
        "openDate": "2010-01-11",
        "closeDate": null,
        "openTime": "09:00",
        "closeTime": "22:00",
        "city": null,
        "metro": "отсутствует метро",
        "email": "xxx@xx.ru",
        "phone": "+79991234567",
        "geoCoordinates": "1.1, 1.1",
        "timeZone": "UTC+03",
        "actualDateFrom": "2000-01-01T00:00:00",
        "actualDateTo": "2049-12-31T23:59:59",
        "users": [
          {
            "login": "artem",
            "position": "a",
            "phone": "+79991234567",
            "fullName": "Артем"
          },
          {
            "login": "asd",
            "position": "a",
            "phone": "+79991234567",
            "fullName": "Жанна"
          },
          {
            "login": "qwe",
            "position": "DM",
            "phone": "+79991234567",
            "fullName": "Юлия"
          }
        ],
        "updateAt": "2011-01-01T21:07:00.437Z",
        "active": true
      },
      {
        "id": 2,
        "no": 2,
        "sapId": "2",
        "mdmId": "2",
        "clusterId": 2,
        "clusterMdmId": "2",
        "clusterName": "Мурманск",
        "clusterSapId": "a",
        "divisionCode": "a",
        "divisionName": "Северо-Запад",
        "divisionSapId": null,
        "divisionMdmId": "1",
        "macroRegionId": 1,
        "macroName": "Северо-Запад",
        "macroSapId": "a",
        "macroMdmId": "a",
        "address": "Мурманская обл, Мурманск г",
        "format": "a",
        "status": "a",
        "openDate": "2011-11-11",
        "closeDate": null,
        "openTime": "11:00",
        "closeTime": "21:00",
        "city": null,
        "metro": "отсутствует метро",
        "email": "xxx@xx.ru",
        "phone": "+79991234567",
        "geoCoordinates": "1.1, 1.1",
        "timeZone": "UTC+03",
        "actualDateFrom": "2000-01-01T00:00:00",
        "actualDateTo": "2049-12-31T23:59:59",
        "users": [
          {
            "login": "zxc",
            "position": "zxc",
            "phone": "+79991234567",
            "fullName": "Сергей"
          },
          {
            "login": "artem",
            "position": "a",
            "phone": "+79991234567",
            "fullName": "Артем "
          },
          {
            "login": "zhanna",
            "position": "a",
            "phone": "+79991234567",
            "fullName": "Жанна"
          }
        ],
        "updateAt": "2021-09-05T21:07:00.437Z",
        "active": true
      }
    ]
  })
})

app.use(`/admin/favicon`, express.static(path.join(__dirname, `build/admin/favicon`)));
app.use(`/admin/scripts`, express.static(path.join(__dirname, `build/admin/scripts`)));
app.use(`/admin/styles`, express.static(path.join(__dirname, `build/admin/styles`)));
app.use(`/admin/fonts`, express.static(path.join(__dirname, `build/admin/fonts`)));
app.use(`/admin/img`, express.static(path.join(__dirname, `build/admin/img`)));

app.use("/favicon", express.static(path.join(__dirname, "build/reports/favicon")));
app.use("/reports/scripts", express.static(path.join(__dirname, "build/reports/scripts")));
app.use("/reports/styles", express.static(path.join(__dirname, "build/reports/styles")));
app.use("/fonts", express.static(path.join(__dirname, "build/reports/fonts")));
app.use("/reports/img", express.static(path.join(__dirname, "build/reports/img")));

app.get([
  "/admin",
  "/admin/stores",
  "/admin/settings",
], (req, res) => {
  res.sendFile("index.html", {root: path.join(__dirname, "build/admin")});
});
app.get([
  "/",
  "/reports",
  "/reports/:code",
], (req, res) => {
  res.sendFile("index.html", {root: path.join(__dirname, "build/reports")});
});

app.use(function (req, res, next) {
  console.error(`404 ${req.url}`);
  res.status(404);
  res.sendFile("index.html", {root: path.join(__dirname, "build")});
});

app.use(function (err, req, res, next) {
  err.userMessage = err.userMessage || "На сервере произошла ошибка";
  res.status(500).send(err.userMessage);
});

server.listen(3000, function () {
  console.log("Приложение запущено http://localhost:3000");
});
