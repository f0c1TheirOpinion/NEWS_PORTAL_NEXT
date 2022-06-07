import React from "react";
import {
  Paper,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import styles from "./Header.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";
import MessageIcon from "@material-ui/icons/Message";
import UserIcon from "@material-ui/icons/AccountCircle";

import NotificationsIcon from "@material-ui/icons/Notifications";
import logoCompany from "../../public/images/logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowButton from "@material-ui/icons/ExpandMore";
import Image from "next/image";
import Link from "next/link";
import { AuthDialog } from "../AuthDialog";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUserData, setUserData } from "../../redux/slices/users";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);

  const [authVisible, setAuthVisible] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAuthDialog = () => {
    setAuthVisible(true);
  };

  const closeAuthDialog = () => {
    setAuthVisible(false);
  };

  const logoutUser = () => {
    document.cookie =
      "rtoken0=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    dispatch(setUserData(null));
  };

  React.useEffect(() => {
    if (authVisible && userData) {
      setAuthVisible(false);
    }
  }, [userData]);

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <div className="d-flex align-center mr-15">
          <IconButton>
            {" "}
            <MenuIcon />{" "}
          </IconButton>
          <Image
            className={styles.logo}
            src={logoCompany}
            width={70}
            height={62}
          />
        </div>
        <div className={styles.searchBlock}>
          <SearchIcon />
          <input placeholder="Поиск" />
        </div>
        {userData ? (
          <Link href="/write">
            <a>
              <Button variant="contained" className={styles.penButton}>
                <CreateIcon />
              </Button>
            </a>
          </Link>
        ) : (
          <Button
            variant="contained"
            onClick={() => setAuthVisible(true)}
            className={styles.penButton}
          >
            <CreateIcon />
          </Button>
        )}
      </div>
      <div className="d-flex align-center">
        <IconButton>
          {" "}
          <MessageIcon />
        </IconButton>

        <IconButton>
          {" "}
          <NotificationsIcon />
        </IconButton>
        {userData ? (
          <>
            <Link href="/profile/1">
              <a className="d-flex align-center">
                <Avatar
                  className="ml-15"
                  alt="Remy Sharp"
                  src="https://w7.pngwing.com/pngs/174/600/png-transparent-cat-animal-lovely-cat.png"
                />
              </a>
            </Link>

            <ArrowButton onClick={handleClick} />
            <Menu
              anchorEl={anchorEl}
              elevation={2}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              keepMounted
            >
              <MenuItem>Мои профиль</MenuItem>
              <MenuItem onClick={logoutUser}>Выйти</MenuItem>
            </Menu>
          </>
        ) : (
          <div className={styles.loginButton} onClick={openAuthDialog}>
            <UserIcon />
            Войти
          </div>
        )}
      </div>
      <AuthDialog onClose={closeAuthDialog} visible={authVisible} />
    </Paper>
  );
};
