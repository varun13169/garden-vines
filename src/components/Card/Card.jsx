import "./card.css";
import { BinSVG, WishlistHeartSVG } from "../../assets/svgReactComponents";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, useLikes, useWatchLater } from "../../contexts";
import LikeSVG from "../../assets/svgReactComponents/LikeSVG";

export default function Card({ itemCardData }) {
  itemCardData = {
    ...itemCardData,
    secAction: () => {},
  };

  const { videoDetails, priAction, secAction, likeAction } = itemCardData;

  const cart = [];
  const { likesState, setLikesState } = useLikes();
  const { authState, checkValidTokenAndSetAuth } = useAuth();
  const { isSignnedIn } = authState;
  const navigate = useNavigate();

  const { _id, title, thumbnail, src, description } = videoDetails;
  console.log("Card");
  console.log(videoDetails);

  const { pathname } = useLocation();

  return (
    <div className="dui-card-prod-hzntl dui-util-bdr-radi-5px-s dui-util-gry-shdw dui-util-pos-rel">
      <div className="dui-card-prod-hzntl__img-container">
        {/* <img className="dui-card-prod-hzntl__img" src={thumbnail} alt="" /> */}
        <Link
          className={`dui-link`}
          to={`/video/${_id}`}
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <iframe
            className="dui-card-prod-hzntl__img"
            src={src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Link>
      </div>

      <div className="dui-card-prod-hzntl__info">
        {/* <p className="dui-card-prod-hzntl__secondary-text">{productName}</p> */}
        <h3
          className="dui-card-prod-hzntl__primary-text dui-util-fw-blk dui-util-txt-align-left"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h3>

        <p
          className="dui-card-prod-hzntl__secondary-text dui-util-txt-align-left"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {description}
        </p>
        {/* <p className="dui-card-prod-hzntl__secondary-text dui-util-txt-sm dui-util-spc-pad-0_8rem-xs dui-util-fw-sbld">
          {discountedPctage}% OFF
        </p> */}
      </div>

      <div className="dui-card-prod-hzntl__actions">
        <div className="dui-card-prod-hzntl__buttons">
          {(pathname === "/" ||
            pathname === "/liked" ||
            pathname === "/history" ||
            pathname === "/watch-later") && (
            <button
              className="primary-action-btn dui-btn dui-btn--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent"
              onClick={() => {
                isSignnedIn
                  ? priAction.action(videoDetails)
                  : navigate("/signin");
              }}
            >
              {priAction.name}
            </button>
          )}
          <button
            className="secondary-action-btn dui-btn dui-util-bdr-radi-999px-mx reset-button-inherit-parent"
            onClick={() => {
              isSignnedIn
                ? likeAction.action(videoDetails)
                : navigate("/signin");
            }}
          >
            {likeAction.isInLikedVideos && (
              <LikeSVG
                height="3rem"
                width="3rem"
                strokeWidth="1.5"
                fill="#F34E4E"
                stroke="#F34E4E"
              ></LikeSVG>
            )}
            {!likeAction.isInLikedVideos && (
              <LikeSVG
                height="3rem"
                width="3rem"
                strokeWidth="1.5"
                fill="none"
                stroke="#F34E4E"
              ></LikeSVG>
            )}
          </button>
          {/* <button
            className="product-card-btn dui-btn dui-btn--secondary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent"
            onClick={() => secAction.action(itemDetails)}
          >
            {secAction.name}
          </button> */}
        </div>
      </div>

      {/* <!-- Button Component Starts -- Icon --> */}

      {/* <button
        className="dui-card-prod-hzntl__wishlist-btn dui-btn dui-util-bdr-radi-999px-mx reset-button-inherit-parent"
        onClick={() => likeAction.action(videoDetails)}
      >
        {likeAction.isInLikedVideos && (
          <WishlistHeartSVG
            className="dui-card-prod-hzntl__wishlist-btn_svg dui-util-spc-pad-0_8rem-xs"
            height="1rem"
            width="1rem"
            strokeWidth="1.5"
            fill="#F34E4E"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></WishlistHeartSVG>
        )}
        {!likeAction.isInLikedVideos && (
          <WishlistHeartSVG
            className="dui-card-prod-hzntl__wishlist-btn_svg dui-util-spc-pad-0_8rem-xs"
            height="1rem"
            width="1rem"
            strokeWidth="1.5"
            fill="none"
            stroke="#F34E4E"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></WishlistHeartSVG>
        )} 
      </button>*/}
      {/* <!-- Button Component Ends -- Icon --> */}
    </div>
  );
}
