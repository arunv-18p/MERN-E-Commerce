import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserSlice, updateUserProfile } from "../../../features/userSlice";
import Loader from "../../loader/Loader";
import { useEffect, useState } from "react";

function AddressView() {
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector(getUserSlice);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    postalCode: "",
    state: "",
    country: "",
  });
  useEffect(() => {
    if (currentUser && currentUser.shippingInfo) {
      setShippingInfo(currentUser.shippingInfo);
    }
  }, [currentUser]);
  return (
    <>
      {currentUser === null || currentUser.shippingInfo === null || loading ? (
        <Loader />
      ) : (
        <div className="bg-background rounded px-3 py-2 d-flex gap-2 align-items-center">
          <FaMapMarkerAlt className="text-muted" />
          <div className="text-truncate">
            <p className=" mb-0 small text-wrap">{shippingInfo.address}</p>
            <p className=" mb-0 small text-wrap">{shippingInfo.postalCode}</p>
            <p className=" mb-0 small text-wrap">{shippingInfo.state}</p>
            <p className=" mb-0 small text-wrap">{shippingInfo.country}</p>
          </div>
          <button
            className="btn btn-sm px-1 ms-auto"
            onClick={() => {
              dispatch(updateUserProfile({ ...currentUser, shippingInfo: null }));
            }}
          >
            <FaTrash />
          </button>
        </div>
      )}
    </>
  );
}

export default AddressView;
