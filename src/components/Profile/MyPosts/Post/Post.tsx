import React from 'react';
import s from './Post.module.css';
import chinese from '../../../../assets/images/chinese.png';

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src={chinese} alt='avatar'/>
        { props.message }
          <div>
        <span>like</span> { props.likesCount }
      </div>
    </div>
  )
}

export default Post;
