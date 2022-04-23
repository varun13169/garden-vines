import "./card.css";
import { BinSVG, WishlistHeartSVG } from "../../assets/svgReactComponents";
import { Link, useLocation } from "react-router-dom";
import { useLikes, useWatchLater } from "../../contexts";

export default function Card({ itemCardData }) {
  itemCardData = {
    ...itemCardData,
    secAction: () => {},
  };

  const { videoDetails, priAction, secAction, likeAction } = itemCardData;

  const cart = [];
  const { likesState, setLikesState } = useLikes();

  const { _id, title, thumbnail, description } = videoDetails;

  const isProductInCart =
    cart.filter((cartProduct) => {
      return videoDetails._id === cartProduct._id;
    }).length !== 0;

  const isInLikedVideos =
    likesState.likes.filter((likedVideo) => {
      return videoDetails._id === likedVideo._id;
    }).length !== 0;

  const { pathname } = useLocation();

  return (
    <div className="dui-card-prod-hzntl dui-util-bdr-radi-5px-s dui-util-gry-shdw dui-util-pos-rel">
      <div className="dui-card-prod-hzntl__img-container">
        <img className="dui-card-prod-hzntl__img" src={thumbnail} alt="" />
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
          {pathname === "/videos" && (
            <button
              className="product-card-btn dui-btn dui-btn--primary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent"
              onClick={() => priAction.action(videoDetails)}
            >
              {priAction.name}
            </button>
          )}
          {pathname === "/products" && isProductInCart && (
            <Link
              to={priAction.toPath}
              className="product-card-link dui-link dui-link--primary dui-util-txt-sm dui-util-spc-pad-xs dui-util-txt-align-cent"
            >
              {priAction.name}
            </Link>
          )}
          {(pathname === "/cart" ||
            (pathname === "/wishlist" && isProductInCart)) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <button
                className="product-card-btn dui-btn dui-btn--primary dui-util-txt-md dui-util-spc-pad reset-button-inherit-parent"
                style={{ flexGrow: "1" }}
                onClick={() => priAction.cartActions.decrement(itemDetails)}
                disabled={
                  (qty ?? cart.filter((cp) => cp._id === _id)[0].qty) === 1
                }
              >
                -
              </button>
              <p className="dui-util-txt-align-cent" style={{ flexGrow: "1" }}>
                {qty ?? cart.filter((cp) => cp._id === _id)[0].qty}
              </p>
              <button
                className="product-card-btn dui-btn dui-btn--primary dui-util-txt-md dui-util-spc-pad-0_8re-xs reset-button-inherit-parent"
                style={{ flexGrow: "1" }}
                onClick={() => priAction.cartActions.increment(itemDetails)}
              >
                +
              </button>
            </div>
          )}
          {/* <button
            className="product-card-btn dui-btn dui-btn--secondary dui-util-txt-sm dui-util-spc-pad-0_8rem-xs reset-button-inherit-parent"
            onClick={() => secAction.action(itemDetails)}
          >
            {secAction.name}
          </button> */}
        </div>
      </div>

      {/* <!-- Button Component Starts -- Icon --> */}
      <button
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
      </button>
      {/* <!-- Button Component Ends -- Icon --> */}
    </div>
  );
}
