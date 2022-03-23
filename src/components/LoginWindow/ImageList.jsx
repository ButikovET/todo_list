import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      className="position-fixed backgroundImage bottom-0 start-50 translate-middle-x w-100 h-100 pt-5 opacity-25"
      variant="quilted"
      cols={8}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://picsum.photos/200?randoom=1",
    title: "Breakfast",
    cols: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=2",
    title: "Burger",
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=3",
    title: "Camera",
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=4",
    title: "Coffee",
    cols: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=5",
    title: "Hats",
    cols: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=6",
    title: "Honey",
    cols: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=7",
    title: "Basketball",
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=8",
    title: "Fern",
  },
  {
    img: "https://picsum.photos/200?randoom=9",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=10",
    title: "Tomato basil",
    rows: 1,
  },
  {
    img: "https://picsum.photos/200?randoom=11",
    title: "Sea star",
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=12",
    title: "Bike",
    cols: 2,
    rows: 1,
  },
  {
    img: "https://picsum.photos/200?randoom=13",
    title: "Sea star",
    cols: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=14",
    title: "Sea star",
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=15",
    title: "Sea star",
    rows: 1,
  },
  {
    img: "https://picsum.photos/200?randoom=16",
    title: "Sea star",
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=17",
    title: "Sea star",
    rows: 1,
  },
  {
    img: "https://picsum.photos/200?randoom=18",
    title: "Sea star",
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=19",
    title: "Sea star",
    rows: 1,
  },
  {
    img: "https://picsum.photos/200?randoom=20",
    title: "Sea star",
    cols: 2,
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=21",
    title: "Sea star",
  },
  {
    img: "https://picsum.photos/200?randoom=22",
    title: "Sea star",
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=23",
    title: "Sea star",
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=24",
    title: "Sea star",
    cols: 2,
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=25",
    title: "Sea star",
    rows: 2,
  },
  {
    img: "https://picsum.photos/200?randoom=26",
    title: "Sea star",
  },
  {
    img: "https://picsum.photos/200?randoom=27",
    title: "Sea star",
  },
  {
    img: "https://picsum.photos/200?randoom=28",
    title: "Sea star",
  },
];
