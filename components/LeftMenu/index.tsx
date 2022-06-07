import React from 'react'
import { Paper, Button, IconButton, Avatar } from '@material-ui/core'
import styles from './LeftMenu.module.scss'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import MessageIcon from '@material-ui/icons/Message';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ListIcon from '@material-ui/icons/List';
import Link from 'next/link';
import {useRouter} from "next/router";

const menu = [
    { text: 'Лента', icon: <WhatshotIcon />, path: '/' },
    { text: 'Сообщения', icon: <MessageIcon />, path: '/messages' },
    { text: 'Рейтинг RJ', icon: <TrendingUpIcon />, path: '/rating' },
    { text: 'Подписки', icon: <ListIcon />, path: '/follows' },
  ];
  


export const LeftMenu: React.FC = () => {
    const router = useRouter();

  return (
        <div className={styles.menu}> 
         <ul>
        {menu.map((obj) => (
          <li key={obj.path}>
              <Link href={obj.path} >
                  <a>
            <Button variant={router.asPath === obj.path ? "contained" : 'text'}>
              {obj.icon}
              {obj.text}
            </Button>
                  </a>
            </Link>
          </li>
        ))}
      </ul>

        </div>

  )
}
