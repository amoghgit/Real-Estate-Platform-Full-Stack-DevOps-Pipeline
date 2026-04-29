import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-800 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 21V9l9-7 9 7v12h-6v-6H9v6H3z" />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-white">
                Estate<span className="text-primary-400">Vue</span>
              </span>
            </Link>
            <p className="text-dark-200 text-sm leading-relaxed">
              Your premium destination for discovering dream properties across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-dark-200 hover:text-primary-400 text-sm transition-colors">Home</Link>
              <Link to="/admin" className="block text-dark-200 hover:text-primary-400 text-sm transition-colors">List Property</Link>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Built With</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Express', 'MongoDB', 'Docker', 'K8s'].map((tech) => (
                <span key={tech} className="text-xs bg-dark-600 text-dark-100 px-2.5 py-1 rounded-lg border border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-dark-300">
          © {new Date().getFullYear()} EstateVue. A DevOps Portfolio Project.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
