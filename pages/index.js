import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { css } from '@emotion/core';
import {
  Content, Footer, Header, Container,
} from '../components/Layout';


const mainCls = css`
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  margin-top: 50px;
  color: #fff;
  .title {
    color: #ffffff;
    font-size: 85px;
    font-weight: bold;
    max-width: 480px;
    line-height: 1;
  }
  .subtitle {
    color: #ffffff;
    font-size: 14px;
    margin-top: 20px;
    line-height: 18px;
  }
  .price {
    color: #ffffff;
    font-size: 28px;
    margin-top: 10px;
  }
  .overview {
    color: #ffffff;
    max-width: 427px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
  }
  .action {
    margin-top: 20px;
    .ant-btn {
      margin-right: 20px;
    }
  }
  .content {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }
  img {
    height: 500px;
    cursor: pointer;
  }
  @media (max-width: 992px) {
    padding: 20px;
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 20px;
    margin-top: 0;
    img {
      width: 100%;
      height: auto;
    }
    .content {
      margin-top: 20px;
    }
    .title {
      font-size: 60px;
    }
  }
`;

const bannerConfig = {
  id: 278927,
  original_title: 'The Jungle Book',
  overview:
    'After a threat from the tiger Shere Khan forces him to flee the jungle, a man-cub named Mowgli embarks on a journey of self discovery with the help of panther, Bagheera, and free spirited bear, Baloo.',
  poster_path: '/tOEOlmLP71IojeJ91dyJ9Nsb8O8.jpg',
  release_year: 2016,
  genres_data: ['Family', 'Adventure', 'Drama', 'Fantasy'],
  price: 305,
};

const HomePage = () => (
  <Container>
    <Header />
    <Content>
      <div css={mainCls} justifyContent="space-between">
        <div className="content">
          <div className="title">{bannerConfig.original_title}</div>
          <div className="subtitle">
            {`2016 | ${bannerConfig.genres_data.toString().replace(/,/g, ', ')}`}
          </div>
          <div className="overview">{bannerConfig.overview}</div>
          <div className="price">{`$${bannerConfig.price}`}</div>
          <div className="action">
            <Button>Purchase</Button>
            <Button href="https://www.youtube.com/watch?v=5mkm22yO-bs&t=1s">Watch Trailer</Button>
          </div>
        </div>
        <Link href={`/product/${bannerConfig.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${bannerConfig.poster_path}`}
            alt={bannerConfig.original_title}
          />
        </Link>
      </div>
    </Content>
    <Footer />
  </Container>
);

export default HomePage;
