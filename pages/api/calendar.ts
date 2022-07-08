import { NextApiHandler } from 'next';
import ical, { CalendarComponent, VEvent } from 'node-ical';

declare const process: {
  env: {
    CALENDAR_URL: string;
  };
};

const isVEvent = (
  calendarComponent: CalendarComponent,
): calendarComponent is VEvent => calendarComponent.type === 'VEVENT';

const handler: NextApiHandler = async (_req, res) => {
  const content = await ical.async.fromURL(process.env.CALENDAR_URL);

  res.status(200).json(
    Object.values(content)
      .filter(isVEvent)
      .filter(({ end }) => end && end > new Date())
      .map(({ start, end }) => ({ start, end })),
  );
};

export default handler;
