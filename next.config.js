//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config) => {
    // Añade una regla para procesar archivos .geojson
    config.module.rules.push({
      test: /\.geojson$/,
      loader: 'file-loader',
      options: {
        name: '[name].[hash].[ext]', // Cambia el nombre del archivo con hash
        outputPath: 'static/geojson/', // Define dónde se guardarán los archivos
      },
    });

    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
