export function flags(nation) {
  switch (nation) {
    case 'German':
    case 'Germany':
      return 'DEU';
    case 'Austrian':
    case 'Austria':
      return 'AUT';

    case 'Spanish':
    case 'Spain':
      return 'ESP';

    case 'Australian':
    case 'Australia':
      return 'AUS';

    case 'Italian':
    case 'Italy':
      return 'ITA';

    case 'British':
    case 'UK':
      return 'GBR';

    case 'Finnish':
    case 'Finland':
      return 'FIN';

    case 'French':
    case 'France':
      return 'FRA';

    case 'Brazilian':
    case 'Brazil':
      return 'BRA';

    case 'Swiss':
    case 'Switzerland':
      return 'CHE';

    case 'Mexican':
    case 'Mexico':
      return 'MEX';

    case 'Dutch':
    case 'Denmark':
      return 'DNK';

    case 'Venezuelan':
      return 'VEN';

    case 'Indian':
    case 'India':
      return 'IND';

    case 'Russian':
    case 'Russia':
      return 'RUS';

    case 'Malaysian':
    case 'Malaysia':
      return 'MYS';

    case 'Chinese':
    case 'China':
      return 'CHN';

    case 'Hungarian':
    case 'Hungary':
      return 'HUN';

    case 'Belgian':
    case 'Belgium':
      return 'BEL';

    case 'United':
    case 'USA':
      return 'USA';

    case 'Canadian':
    case 'Canada':
      return 'CAN';

    case 'Japanase':
    case 'Japan':
      return 'JPN';

    case 'Singapore':
      return 'SGP';

    case 'Monaco':
      return 'MCO';

    case 'Korean':
    case 'Korea':
      return 'KOR';
    case 'Bahrain':
      return 'BHR';
    case 'UAE':
      return 'ARE'

    default:
      return 'SRB';
  }
}
