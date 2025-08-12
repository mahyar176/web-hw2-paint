CREATE TABLE paintings (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    painting TEXT
);

INSERT INTO paintings (username, password, painting) VALUES ('user1', '123', '');
INSERT INTO paintings (username, password, painting) VALUES ('user2', '123', '');


INSERT INTO paintings (username, password, painting) VALUES ('user', '123', '{
  "title": "painting 1",
  "shapes": [
    {
      "type": "square",
      "x": 257,
      "y": 176,
      "id": 1753555816839
    },
    {
      "type": "square",
      "x": 676,
      "y": 235,
      "id": 1753555817095
    },
    {
      "type": "square",
      "x": 622,
      "y": 453,
      "id": 1753555817394
    },
    {
      "type": "square",
      "x": 344,
      "y": 600,
      "id": 1753555817675
    },
    {
      "type": "square",
      "x": 894,
      "y": 469,
      "id": 1753555817953
    },
    {
      "type": "square",
      "x": 284,
      "y": 224,
      "id": 1753555818284
    },
    {
      "type": "circle",
      "x": 471,
      "y": 111,
      "id": 1753555819784
    },
    {
      "type": "circle",
      "x": 427,
      "y": 315,
      "id": 1753555820121
    },
    {
      "type": "circle",
      "x": 649,
      "y": 314,
      "id": 1753555820410
    },
    {
      "type": "circle",
      "x": 1035,
      "y": 173,
      "id": 1753555820750
    },
    {
      "type": "circle",
      "x": 1029,
      "y": 130,
      "id": 1753555821015
    },
    {
      "type": "triangle",
      "x": 183,
      "y": 502,
      "id": 1753555822065
    },
    {
      "type": "triangle",
      "x": 726,
      "y": 495,
      "id": 1753555822323
    },
    {
      "type": "triangle",
      "x": 727,
      "y": 338,
      "id": 1753555822625
    },
    {
      "type": "triangle",
      "x": 702,
      "y": 235,
      "id": 1753555822960
    }
  ]
}');
