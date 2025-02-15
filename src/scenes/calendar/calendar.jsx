import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { BASE_URL } from "../../components/constants/baseurl";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`${BASE_URL}/api/events`);
      const events = await response.json();
      setCurrentEvents(events);
    };
    fetchEvents();
  }, []);
  // const handleDateClick = (selected) => {
  //   const title = prompt("Please enter a new title for your event");
  //   const calendarApi = selected.view.calendar;
  //   calendarApi.unselect();

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: `${selected.dateStr}-${title}`,
  //       title,
  //       start: selected.startStr,
  //       end: selected.endStr,
  //       allDay: selected.allDay,
  //     });
  //   }
  // };

  // const handleDateClick = async (selected) => {
  //   const title = prompt("Please enter a new title for your event");
  //   const calendarApi = selected.view.calendar;
  //   calendarApi.unselect();

  //   if (title) {
  //     const newEvent = {
  //       title,
  //       start: selected.startStr,
  //       end: selected.endStr,
  //       allDay: selected.allDay,
  //     };

  //     // إرسال الحدث إلى السيرفر لحفظه في قاعدة البيانات
  //     const response = await fetch(`${BASE_URL}/api/events`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newEvent),
  //     });

  //     const savedEvent = await response.json();

  //     // إضافة الحدث إلى التقويم
  //     calendarApi.addEvent({
  //       id: savedEvent._id,
  //       ...newEvent,
  //     });
  //   }
  // };
  const handleDateClick = async (selected) => {
    console.log(selected)
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };

      // إرسال الحدث إلى السيرفر لحفظه في قاعدة البيانات
      const response = await fetch(`${BASE_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      const savedEvent = await response.json();

      // إضافة الحدث إلى التقويم مع حفظ _id في extendedProps
      calendarApi.addEvent({
        id: savedEvent._id, // مهم جدًا
        title: savedEvent.title,
        start: savedEvent.start,
        end: savedEvent.end,
        allDay: savedEvent.allDay,
        extendedProps: { _id: savedEvent._id }, // تخزين الـ _id الأصلي
      });
    }
  };

  const handleEventClick = async (selected) => {
    console.log(selected.event._def.extendedProps._id)
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'?`)) {
      // احذف الحدث من الـ Database
      await fetch(`${BASE_URL}/api/events/${selected.event._def.extendedProps._id}`, {
        method: "DELETE",
      });

  // احذف الحدث من التقويم
      selected.event.remove();

      // تحديث حالة الأحداث بعد الحذف
      setCurrentEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== selected.event._def.extendedProps._id)
      );
    }
  };
  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => {
              console.log(event)
              return (
                <ListItem
                  key={event._id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              )
            }
            )}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            // eventsSet={(events) => setCurrentEvents(events)}
            events={currentEvents}
            // initialEvents={currentEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
