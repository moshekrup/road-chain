const util = require('util');
const exec = util.promisify(require('child_process').exec);
const geoip = require('geoip-lite');

const execCommand = async(command) => {
    const { stdout, stderr } = await exec(command);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    return stdout
};

const getCurrentLocation = async (req, res, next) => {
    try {
        const command = "dig TXT +short o-o.myaddr.l.google.com @ns1.google.com | awk -F'\"' '{ print $2}'";
        const ip = await execCommand(command);
        const location = geoip.lookup(ip.trim());
        // take out the latitude and longitude
        res.status(200).send([location.ll[0], location.ll[1]]);
        next();
    } catch(err) {
        next(err);
    }
}

module.exports = getCurrentLocation