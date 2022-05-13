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

  const { pathname } = useLocation();

  return (
    <div className="dui-card-prod-hzntl dui-util-bdr-radi-5px-s dui-util-gry-shdw dui-util-pos-rel">
      <div className="dui-card-prod-hzntl__img-container">
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
      </div>

      <div className="dui-card-prod-hzntl__actions">
        <div className="dui-card-prod-hzntl__buttons">
          {(pathname === "/" ||
            pathname === "/liked" ||
            pathname === "/history" ||
            pathname === "/playlists" ||
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
    </div>
  );
}
