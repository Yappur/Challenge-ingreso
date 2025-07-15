import { useRef, useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

export default function Modal({
  isOpen,
  onClose,
  tipo = "confirm",
  titulo,
  mensaje,
  btnPrimario = "Aceptar",
  btnSecundario = "Cancelar",
  accionPrimaria,
  accionSecundaria,
}) {
  const modalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {}, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    onClose();
  };

  if (!isOpen) return null;

  const getIcon = () => {
    switch (tipo) {
      case "confirm":
        return (
          <div className="flex h-16 w-16 items-center justify-center">
            <FaSave className="h-10 w-10 text-[#3D75CE]" />
          </div>
        );
      case "delete":
        return (
          <div className="flex items-center justify-center">
            <MdDeleteSweep className="h-12 w-12 text-[#ac101d] animate-bounce " />
          </div>
        );
      default:
        return (
          <div className="flex h-16 w-16 items-center justify-center ">
            <FaSave className="h-10 w-10 text-[#3D75CE]" />
          </div>
        );
    }
  };

  const handleAccionPrimaria = () => {
    if (accionPrimaria) accionPrimaria();
    handleClose();
  };

  const handleAccionSecundaria = () => {
    if (accionSecundaria) accionSecundaria();
    handleClose();
  };

  const handleBackdropClick = () => {
    handleClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={handleBackdropClick}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          ref={modalRef}
          className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg shadow-black/75"
        >
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <div className="">{getIcon()}</div>

            <h3 className="text-xl font-bold">{titulo}</h3>

            {mensaje && <p className="text-sm text-gray-600">{mensaje}</p>}

            <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <>
                <button
                  onClick={handleAccionSecundaria}
                  className="w-full rounded-xl border border-gray-700 px-4 py-2 text-gray-700 hover:bg-gray-200 transition duration-500 ease-in-out shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {btnSecundario}
                </button>
                <button
                  onClick={handleAccionPrimaria}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-gray-900 text-white rounded-xl hover:from-blue-600 hover:to-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {btnPrimario}
                </button>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
