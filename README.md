![CSComparison](https://gcdnb.pbrd.co/images/0yITKCsq3sIS.png?o=1)

# CSComparison: Compare Stats of Pro Counter-Strike 2 Players

**CSComparison** is a web application that allows users to compare the stats of current professional Counter-Strike 2 players. Built with **React** for the frontend and a [custom **Java Spring Boot** web scraper + REST API](https://github.com/KDominikk00/HLTVScraper) for the backend, it offers a dynamic and intuitive interface to analyze player performance across various metrics.

Home Page             |  Top Players         |  Compare Page          |  Explained Section
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![Home Page](https://i.imgur.com/P3WFE5P.png)  |  ![Top Players](https://i.imgur.com/LyoiSXw.png) |  ![Compare Page](https://i.imgur.com/u4cJErB.png) |  ![Explained Section](https://i.imgur.com/gOeqLWh.png)

## Features

- **Player Comparison**: Compare the stats of two professional Counter-Strike 2 players side-by-side.
- **Key Stats**: Compare metrics like K/D ratio, rating, rounds played, maps played, and more.
- **Dynamic Visualizations**: Visualize differences in player performance using interactive progress bars and charts.
- **Average Rounds Per Match**: See how many rounds, on average, it takes for each player to complete a match.
- **Responsive UI**: Clean, modern, and mobile-friendly design built using **React** and **Tailwind CSS**.

## Technologies Used

- **Frontend**:
  - **React**: A popular JavaScript library for building dynamic user interfaces.
  - **Tailwind CSS**: A utility-first CSS framework for building responsive layouts and designs.

- **Backend**:
  - **Java Spring Boot**: A powerful framework for building production-grade applications with ease.
  - **Spring JPA**: Simplifies database interactions using Java Persistence API (JPA).
  - **Lombok**: A Java library used to reduce boilerplate code.

- **Web Scraping**:
  - **Selenium**: Used for automating web browsers to scrape player data.
  - **ChromeDriver**: Required by Selenium for controlling the Chrome browser during the scraping process.
  - **Java-based Web Scraper**: Scrapes live player data from multiple online sources to keep player stats updated.

## How It Works

CSComparison works by fetching real-time data through a custom REST API, which collects and processes player statistics using a **Java-based web scraper**. The scraper, powered by **Selenium** and **ChromeDriver**, automates web browsers to scrape up-to-date information on professional Counter-Strike 2 players.

The data is served via a REST API built using **Java Spring Boot**, which handles player queries and delivers the stats to the React frontend. The frontend then displays the statistics, allowing users to compare different players side-by-side across multiple performance categories.

## API & Web Scraper

The backend is composed of a **REST API** and a **web scraper**. The **API** is built with **Java Spring Boot** and **Spring JPA** to manage data storage and requests. The **web scraper** uses **Selenium** with **ChromeDriver** to automate data collection from websites, fetching real-time player statistics.

- **API**: Handles requests and sends player data to the frontend for visualization.
- **Web Scraper**: Uses **Selenium** and **ChromeDriver** to scrape player stats from online sources and keep the database updated with the latest performance metrics.

You can find the full repository for the **API** and **Web Scraper** [here](https://github.com/KDominikk00/CSComparison-API).
