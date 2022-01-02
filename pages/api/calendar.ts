import { NextApiHandler } from 'next';
import ical from 'node-ical';

declare const process: {
  env: {
    CALENDAR_URL: string;
  };
};

const handler: NextApiHandler = async (_req, res) => {
  const content = await ical.async.fromURL(process.env.CALENDAR_URL);

  res.status(200).json(
    Object.values(content)
      .filter(({ type, end }) => type === 'VEVENT' && end && end > new Date())
      .map(({ start, end }) => ({ start, end })),
  );
};

export default handler;
