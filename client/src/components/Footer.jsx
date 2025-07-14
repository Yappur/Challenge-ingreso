import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-4 pt-8">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"></div>

      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-6">
          <a
            href="https://www.linkedin.com/in/mateoyapur/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full border-2 border-blue-200 hover:from-blue-500 hover:to-blue-600 hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-200"
          >
            <Linkedin className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
          </a>

          <a
            href="https://github.com/Yappur"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full border-2 border-gray-200 hover:from-gray-800 hover:to-gray-900 hover:border-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-300"
          >
            <Github className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
          </a>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">
            Prueba tecnica realizada para ingreso
          </p>
          <p className="text-xs text-gray-500">© 2025 - Mateo Yapur</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
