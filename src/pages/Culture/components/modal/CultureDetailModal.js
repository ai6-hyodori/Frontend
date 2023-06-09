import styled from 'styled-components';
import { useEffect, useState } from 'react';
import API from 'API';
const CultureDetailModal = ({
  infoModal,
  showModal,
  children,
  className,
  onClose,
  maskClosable,
  closable,
}) => {
  const [selectedModalInfo, setSelectedModalInfo] = useState({});

  useEffect(() => {
    API.get(`/api/facility/${infoModal}`)
      .then(Response => {
        setSelectedModalInfo(Response.data.data);
      })
      .catch(Error => {
        console.log(Error);
      });
  }, [infoModal]);

  const onMaskClick = e => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = e => {
    if (onClose) {
      onClose(e);
    }
  };

  return (
    <>
      <ModalOverlay visible={showModal} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={showModal}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          {closable && (
            <div className="info">
              {selectedModalInfo.fac_name}
              <br></br>
              {selectedModalInfo.fac_desc}
              <br></br>

              <img src={selectedModalInfo.main_img} alt="main-img" />
            </div>
          )}
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

CultureDetailModal.defaultProps = {
  closable: true,
  maskClosable: true,
  visible: false,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 600px;
  max-width: 700px;
  height: 600px;
  max-height: 700px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

export default CultureDetailModal;
