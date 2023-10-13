import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ApiKey } from "../../services/ApiKey";
import styled from "styled-components";
import Header from "../common/Header";
import Table from "../common/Table";
import NothingIcon from "../../assets/icon_nothing.svg";
import { useNavigate } from "react-router-dom";

const RecentSearch = () => {
  const recentList = useRef([]);
  const [recList, setReclist] = useState(
    localStorage.getItem("Recent")?.split(",")
  );
  console.log('recList', recList)
  const activePage = 3;
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        if (recList) {
          const lists = recList.map((rec) => {
            return axios
              .get(
                `http://api.openweathermap.org/data/2.5/weather?q=${rec}&units=metric&appid=${ApiKey}`
              )
              .then((res) => res.data)
              .catch((e) => console.error(e));
          });

          Promise.all(lists).then((res) => {
            recentList.current = res;
            setRender(true);
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [recentList, recList]);

  

  const handleRemove = () => {
    document.getElementById("hide-recent-list").className =
      "remove-recent-search";
    document.getElementById("no").className = "unclick-rec-res";
    document.getElementById("yes").className = "click-rec-res";
  };

  const handleSelect = (e) => {
    if (e.target.id === "yes") {
      localStorage.removeItem("Recent");
      localStorage.removeItem("SEARCHEDPLACE");
      setReclist([]);
      window.location.reload(true);
    }
    setTimeout(
      () =>
        (document.getElementById("hide-recent-list").className = "hidden-list"),
      1000
    );
  };

  const handleChange = (value) => {
    const placeSearch = localStorage.setItem("SEARCHEDPLACE", value);
    navigate("/", { state: { value: placeSearch } });
  };

  return (
    <Wrapper>
      <div className="container">
        <Header handleChange={handleChange} activepage={activePage} />
        {JSON.stringify(recList) == JSON.stringify([""]) ||
        recentList.current.length === 0 ? (
          <div className="no-recent-search">
            <img src={NothingIcon} className="icon-nothing" />
            <div className="no-recent-search-msg">No Recent Search</div>
          </div>
        ) : (
          <div className="top">
            <div className="first-row">
              <div className="list-length">You recently searched for</div>
              <div className="clear" onClick={handleRemove}>
                Clear all
              </div>
            </div>
            <Table list={recentList.current} />
          </div>
        )}
        <div className="hidden-list" id="hide-recent-list">
          <div className="clear-confirm">
            Are you sure want to clear recent searches?
          </div>
          <div className="yes-no">
            <div className="unclick-rec-res" onClick={handleSelect} id="no">
              NO
            </div>
            <div className="unclick-rec-res" onClick={handleSelect} id="yes">
              YES
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100wh;
  background-size: cover;
  overflow: scroll;

  .container {
    margin-left: 10%;
    margin-right: 10%;
  }

  .no-recent-search {
    text-align: center;
    margin-top: 176px;
  }

  .no-recent-search-msg {
    margin-top: 25px;
    height: 21px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 21px;
  }

  .first-row {
    display: flex;
    justify-content: space-between;
    margin-top: 23px;
    height: 15px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 15px;
  }

  .remove-recent-search {
    height: 210px;
    width: 350px;
    border-radius: 2px;
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.5);
  }

  .clear-confirm {
    height: 18px;
    color: #000000;
    font-family: Roboto;
    font-size: 15px;
    letter-spacing: 0;
    line-height: 18px;
    text-align: center;
    margin-top: 58px;
  }
  .clear {
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .yes-no {
    display: flex;
    justify-content: center;
  }

  .click-rec-res {
    box-sizing: border-box;
    border-radius: 2px;
    width: 106px;
    background-color: #f76b1c;
    color: #ffffff;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 18px;
    padding: 9px 40px;
    margin-top: 70px;
    text-align: center;
  }

  .unclick-rec-res {
    box-sizing: border-box;
    height: 18px;
    color: #000000;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 18px;
    padding: 9px 40px;
    margin-top: 70px;
    text-align: center;
  }

  .hidden-list {
    display: none;
  }

  @media all and (max-width: 750px) {
    .container {
      margin-right: 5%;
      margin-left: 5%;
    }
    .first-row {
      margin-top: 7.2rem;
    }
  }
`;

export default RecentSearch;
