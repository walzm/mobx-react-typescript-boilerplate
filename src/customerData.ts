export const CustomerTransportModel = {
    "addresses": [
        {
            "address": {
                "city": "Musterstadt",
                "countryCode": "DE",
                "countryName": "Deutschland",
                "houseNumber": "12 b",
                "isVatIdValid": null,
                "line1": "Kunststoffprofi",
                "line2": "",
                "line3": "",
                "street": "Sackgasse",
                "streetComplete": "Sackgasse 12 b",
                "vatId": "DE34738434",
                "zipcode": "54332",
                "isDeleted": false,
                "isModified": false,
                "isNew": false,
                "modificationState": 0,
                "displayLabel": "AddressTransportModel 10",
                "id": 10,
                "timestamp": "AAAAAAAAB9s="
            },
            "addressReference": {
                "description": null,
                "id": 10,
                "label": null,
                "localizedDescription": {
                    "texts": {

                    }
                },
                "localizedLabel": {
                    "texts": {

                    }
                }
            },
            "customerReference": {
                "description": null,
                "id": 1,
                "label": null,
                "localizedDescription": {
                    "texts": {

                    }
                },
                "localizedLabel": {
                    "texts": {

                    }
                }
            },
            "dateDeleted": null,
            "deliveryTerm": null,
            "deliveryTermReference": {
                "description": null,
                "id": null,
                "label": null,
                "localizedDescription": {
                    "texts": {

                    }
                },
                "localizedLabel": {
                    "texts": {

                    }
                }
            },
            "isBillingAddress": true,
            "isDefaultBillingAddress": true,
            "isDefaultDeliveryAddress": true,
            "isDefaultHouseAddress": true,
            "isDeliveryAddress": true,
            "isHouseAddress": true,
            "label": null,
            "isDeleted": false,
            "isModified": false,
            "isNew": false,
            "modificationState": 0,
            "displayLabel": "CustomerAddressTransportModel 1",
            "id": 1,
            "timestamp": "AAAAAAAACqs="
        },
        {
            "address": {
                "city": "Musterstadt-Waldheim",
                "countryCode": "DE",
                "countryName": "Deutschland",
                "houseNumber": "14 a",
                "isVatIdValid": null,
                "line1": "Kunststoffprofi",
                "line2": "Lager",
                "line3": "",
                "street": "Sackgasse",
                "streetComplete": "Sackgasse 14 a",
                "vatId": "",
                "zipcode": "54332",
                "isDeleted": false,
                "isModified": false,
                "isNew": false,
                "modificationState": 0,
                "displayLabel": "AddressTransportModel 11",
                "id": 11,
                "timestamp": "AAAAAAAAB9w="
            },
            "addressReference": {
                "description": null,
                "id": 11,
                "label": null,
                "localizedDescription": {
                    "texts": {

                    }
                },
                "localizedLabel": {
                    "texts": {

                    }
                }
            },
            "customerReference": {
                "description": null,
                "id": 1,
                "label": null,
                "localizedDescription": {
                    "texts": {

                    }
                },
                "localizedLabel": {
                    "texts": {

                    }
                }
            },
            "dateDeleted": null,
            "deliveryTerm": {
                "description": {
                    "texts": {
                        "de": "Ein Beispiel-Datensatz für Lieferbedingungen für Freunde & Familie",
                        "en": "A sample set of data for delivery terms for friends and family"
                    }
                },
                "displayLabel": "Freunde - DAP",
                "incoTerm": {
                    "description": {
                        "texts": {
                            "de": "Geliefert benannter Ort",
                            "en": "Delivered At Place"
                        }
                    },
                    "displayLabel": "DAP",
                    "shortName": "DAP",
                    "isDeleted": false,
                    "isModified": false,
                    "isNew": false,
                    "modificationState": 0,
                    "id": 8,
                    "timestamp": "AAAAAAAACCg="
                },
                "incoTermReference": {
                    "description": null,
                    "id": 8,
                    "label": null,
                    "localizedDescription": {
                        "texts": {

                        }
                    },
                    "localizedLabel": {
                        "texts": {

                        }
                    }
                },
                "label": "Freunde",
                "shortName": "Privat",
                "isDeleted": false,
                "isModified": false,
                "isNew": false,
                "modificationState": 0,
                "id": 1,
                "timestamp": "AAAAAAAACCk="
            },
            "deliveryTermReference": {
                "description": null,
                "id": 1,
                "label": null,
                "localizedDescription": {
                    "texts": {

                    }
                },
                "localizedLabel": {
                    "texts": {

                    }
                }
            },
            "isBillingAddress": false,
            "isDefaultBillingAddress": false,
            "isDefaultDeliveryAddress": false,
            "isDefaultHouseAddress": false,
            "isDeliveryAddress": false,
            "isHouseAddress": false,
            "label": "",
            "isDeleted": false,
            "isModified": false,
            "isNew": false,
            "modificationState": 0,
            "displayLabel": "CustomerAddressTransportModel 2",
            "id": 2,
            "timestamp": "AAAAAAAACqw="
        }
    ],
    "dateDeleted": null,
    "displayLabel": "K0001 - KP",
    "label": "Kunststoffprofi",
    "mandator": {
        "label": "Oscar Meyer & Sohn Metallbau OHG",
        "localCurrency": null,
        "isDeleted": false,
        "isModified": false,
        "isNew": false,
        "modificationState": 0,
        "displayLabel": "MandatorTransportModel 1",
        "id": 1,
        "timestamp": "AAAAAAAACJY="
    },
    "matchcode": "KP",
    "number": "K0001",
    "paymentTerm": {
        "description": {
            "texts": {
                "de": "Ein Beispiel-Datensatz für Zahlungsbedingungen mit einem Skonto",
                "en": "A sample set of data for payment terms with an early payment discount"
            }
        },
        "displayLabel": "Ein Skonto",
        "firstEarlyDiscountDays": 10,
        "firstEarlyDiscountPercentage": 2,
        "label": "Ein Skonto",
        "netDays": 42,
        "secondEarlyDiscountDays": null,
        "secondEarlyDiscountPercentage": null,
        "shortName": "ES",
        "isDeleted": false,
        "isModified": false,
        "isNew": false,
        "modificationState": 0,
        "id": 1,
        "timestamp": "AAAAAAAACqg="
    },
    "paymentTermReference": {
        "description": null,
        "id": 1,
        "label": null,
        "localizedDescription": {
            "texts": {

            }
        },
        "localizedLabel": {
            "texts": {

            }
        }
    },
    "mandatorReference": {
        "description": null,
        "id": 1,
        "label": "Oscar Meyer & Sohn Metallbau OHG",
        "localizedDescription": {
            "texts": {

            }
        },
        "localizedLabel": {
            "texts": {

            }
        }
    },
    "mandatorLabel": null,
    "isDeleted": false,
    "isModified": false,
    "isNew": false,
    "modificationState": 0,
    "id": 1,
    "timestamp": "AAAAAAAACqk="
};
