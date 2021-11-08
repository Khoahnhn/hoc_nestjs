import * as bonjour from 'bonjour';
import * as mdns from 'multicast-dns';

export function initMdns() {
  mdns.on('response', function (response) {
    console.log('got a response packet:', response);
  });

  mdns.on('query', function (query) {
    console.log('got a query packet:', query);
  });

  mdns.query({
    questions: [
      {
        name: 'brunhilde.local',
        type: 'A',
      },
    ],
  });
}
