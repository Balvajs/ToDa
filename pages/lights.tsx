import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useThrottle } from 'rooks';

import { BrigthnessSlider } from '../components/brightness-slider';
import { TempSlider } from '../components/temp-slider';

const connectToApi = ({
  resource,
  ...args
}:
  | {
      resource: 'groups' | 'lights' | 'none';
    }
  | {
      resource: 'groups' | 'lights';
      id: number;
      body: Record<string, unknown>;
    }) =>
  fetch(
    `http://${process.env.NEXT_PUBLIC_LIGHTS_HOST}/api/${
      process.env.NEXT_PUBLIC_LIGHTS_USERNAME
    }/${resource !== 'none' ? resource : ''}${
      'id' in args
        ? `/${args.id}/${resource === 'lights' ? 'state' : 'action'}`
        : ''
    }`,
    {
      method: 'id' in args ? 'PUT' : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...('body' in args ? { body: JSON.stringify(args.body) } : {}),
    },
  );

const putGroupState = (id: number, state: { ct?: number; bri?: number }) =>
  connectToApi({ resource: 'groups', id, body: state });

const putLightState = (id: number, state: { ct?: number; bri?: number }) =>
  connectToApi({ resource: 'lights', id, body: state });

type Light = {
  state: {
    ct: number;
    bri: number;
    on: boolean;
    reachable: boolean;
  };
  capabilities: {
    control: {
      ct: {
        min: number;
        max: number;
      };
    };
  };
};

type Group = {
  lights: string[];
  action: {
    ct: number;
    bri: number;
  };
  name: string;
};

export default function Lights() {
  const [throttledPutGroupState] = useThrottle(putGroupState, 1000) as [
    typeof putGroupState,
    boolean,
  ];
  const [throttledPutLightState] = useThrottle(putLightState, 100) as [
    typeof putLightState,
    boolean,
  ];
  const [lights, setLights] = useState<Record<number, Light>>();
  const [groups, setGroups] = useState<Record<number, Group>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      connectToApi({ resource: 'none' })
        .then((res) => res.json())
        .then((res) => {
          if ('lights' in res) setLights(res.lights);
          if ('groups' in res) setGroups(res.groups);
        }),
    ]).finally(() => setLoading(false));
  }, []);

  const renderGroupTempSlider = (id: number) => {
    const data = groups?.[id];

    if (!data) {
      return `Group ${id} not found`;
    }

    if (!lights) {
      return 'Lights are not defined';
    }

    const { min, max } = data.lights
      .map((lightId) => lights[parseInt(lightId, 10)])
      .reduce(
        (
          acc,
          {
            capabilities: {
              control: { ct },
            },
          },
        ) => ({
          min: Math.min(acc.min, ct.min),
          max: Math.max(acc.max, ct.max),
        }),
        { min: 1000, max: 0 },
      );

    return (
      <TempSlider
        min={min}
        max={max}
        initialValue={data.action.ct}
        onChange={(ct) => throttledPutGroupState(id, { ct })}
      />
    );
  };

  const renderGroupBrightnessSlider = (id: number) => {
    const data = groups?.[id];

    if (!data) {
      return `Group ${id} not found`;
    }

    return (
      <BrigthnessSlider
        initialValue={data.action.bri}
        onChange={(bri) => throttledPutGroupState(id, { bri })}
      />
    );
  };

  const renderLightBrightnessSlider = (id: number) => {
    const data = lights?.[id];

    if (!data) {
      return `Light ${id} not found`;
    }

    return (
      <BrigthnessSlider
        initialValue={data.state.bri}
        onChange={(bri) => throttledPutLightState(id, { bri })}
      />
    );
  };

  return (
    <div style={{ maxWidth: '90vw', width: '450px', margin: 'auto' }}>
      {loading && 'Loading...'}
      {!loading && lights && groups && (
        <>
          <Typography variant="h5" pt={2}>
            Přízemí
          </Typography>
          {renderGroupTempSlider(7)}
          <Typography variant="subtitle1">Stůl</Typography>
          {renderGroupBrightnessSlider(2)}

          <Typography variant="h5" mt={5}>
            Ložnice malá
          </Typography>
          {renderGroupTempSlider(9)}
          <Typography variant="subtitle1">Hlavní světlo</Typography>
          {renderGroupBrightnessSlider(15)}
          <Typography variant="subtitle1">Lampička levá</Typography>
          {renderLightBrightnessSlider(29)}
          <Typography variant="subtitle1">Lampička pravá</Typography>
          {renderLightBrightnessSlider(30)}

          <Typography variant="h5" mt={5}>
            Ložnice velká
          </Typography>
          {renderGroupTempSlider(8)}
          <Typography variant="subtitle1">Hlavní světlo</Typography>
          {renderGroupBrightnessSlider(14)}
          <Typography variant="subtitle1">Lampička levá</Typography>
          {renderLightBrightnessSlider(28)}
          <Typography variant="subtitle1">Lampička pravá</Typography>
          {renderLightBrightnessSlider(31)}
        </>
      )}
      {!loading && (!lights || !groups) && (
        <Typography variant="h4" pt={2}>
          Připojte se přes WiFi ToDa
        </Typography>
      )}
    </div>
  );
}
