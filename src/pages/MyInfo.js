import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import StarRating from '../components/StarRating';

const MyInfo = () => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || '';
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };
    const [pick, setPick] = useState(-1);
    const [media, setMedia] = useState('movie');

    const reviews = [];

    const keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
        reviews.push([keys[i], JSON.parse(localStorage.getItem(keys[i]))]);
    }

    console.log('info', reviews);
    return (
        <div className="myinfo">
            <div className="myinfo_wrapper">
                <section className="myinfo_section">
                    <section className="myinfo_img_section">
                        <img
                            src={process.env.PUBLIC_URL + `assets/myimage.png`}
                            width="150px"
                        />
                    </section>

                    <section className="myinfo_text_section">
                        <h4>장혜림</h4>
                    </section>
                </section>
                {/* <section className="mygraph_section">내 별점 그래프</section> */}
                <section className="mylist_section">
                    {modalOpen && (
                        <Modal
                            handleModalBtn={handleModalOpen}
                            contentId={pick}
                            contentMedia={media} //movie or tv
                        />
                    )}
                    <h3>내 리뷰 목록</h3>

                    {reviews ? (
                        <div className="review_list">
                            {reviews.map((review) => (
                                <div
                                    className="review_block"
                                    key={review[0]}
                                    onClick={() => {
                                        setModalOpen(true);
                                        setMedia(review[1].media);
                                        setPick(review[0]);
                                    }}
                                >
                                    <b>{review[1].review}</b>
                                    <StarRating
                                        star={review[1].star}
                                        readOnly={true}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>작성한 리뷰가 없습니다.</p>
                    )}
                </section>
            </div>
        </div>
    );
};
export default React.memo(MyInfo);
