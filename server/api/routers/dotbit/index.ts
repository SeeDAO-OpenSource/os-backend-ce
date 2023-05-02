import { DotbitController } from './dotbit.controller';
import { createDotbitRouter } from './dotbit.route';
import service from './dotbit.service';
import sgnVerifier from './dotbit.sgn';
import addressVerifier from './dotbit.address';
import { CdkeyVerifier } from './dotbit.cdkey';

service.addVerifier(addressVerifier)
service.addVerifier(new CdkeyVerifier()) // CdKey 优先 SGN
service.addVerifier(sgnVerifier)

const route = createDotbitRouter(new DotbitController(service));

export default {
  route
};