import {Config} from 'src/Config';
import {HttpClient} from './HttpClient';

export const httpClient = new HttpClient({
  protocol: Config.defaultApiProtocol,
  domain: Config.defaultApiDomain,
});
