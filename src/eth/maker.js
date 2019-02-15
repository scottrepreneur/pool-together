import Maker from '@makerdao/dai';

const contracts = {
    ['PD_PROXY']: {
        address: addresses.PD_PROXY,
        abi: pdProxyAbi
    }
}

export default async function createMaker() {
    return await Maker.create('browser', {});
}