import unittest
from copy import deepcopy
from booking import can_book


class BookingTests(unittest.TestCase):
    def test_touching_end(self):
        self.assertIs(can_book(660, 720, 540, False, [(600, 660)]), True)

    def test_overlap(self):
        self.assertIs(can_book(630, 690, 540, False, [(600, 660)]), False)

    def test_blocked(self):
        self.assertIs(can_book(660, 720, 540, True, [(600, 660)]), False)

    def test_exactly_120(self):
        self.assertIs(can_book(720, 840, 540, False, [(600, 660)]), True)

    def test_duration_121(self):
        self.assertIs(can_book(720, 841, 540, False, []), False)

    def test_starts_now(self):
        self.assertIs(can_book(540, 570, 540, False, []), False)

    def test_reversed(self):
        self.assertIs(can_book(720, 660, 540, False, []), False)

    def test_midnight(self):
        self.assertIs(can_book(1380, 1440, 540, False, []), True)

    def test_after_midnight(self):
        self.assertIs(can_book(1380, 1441, 540, False, []), False)

    def test_second_booking(self):
        self.assertIs(
            can_book(720, 780, 540, False, [(600, 660), (700, 760)]),
            False,
        )

    def test_touching_start(self):
        self.assertIs(can_book(550, 600, 540, False, [(600, 660)]), True)

    def test_one_minute_future(self):
        self.assertIs(can_book(541, 542, 540, False, []), True)

    def test_past(self):
        self.assertIs(can_book(539, 570, 540, False, []), False)

    def test_negative(self):
        self.assertIs(can_book(-1, 30, 0, False, []), False)

    def test_equal(self):
        self.assertIs(can_book(600, 600, 540, False, []), False)

    def test_float_start(self):
        self.assertIs(can_book(600.5, 630, 540, False, []), False)

    def test_float_end(self):
        self.assertIs(can_book(600, 630.5, 540, False, []), False)

    def test_boolean(self):
        self.assertIs(can_book(True, 30, 0, False, []), False)

    def test_contains_booking(self):
        self.assertIs(can_book(590, 670, 540, False, [(600, 660)]), False)

    def test_inside_booking(self):
        self.assertIs(can_book(610, 620, 540, False, [(600, 660)]), False)

    def test_overlap_end(self):
        self.assertIs(can_book(650, 700, 540, False, [(600, 660)]), False)

    def test_empty(self):
        self.assertIs(can_book(660, 720, 540, False, []), True)

    def test_nonmutation_available(self):
        existing = [[700, 760], [600, 660]]
        before = deepcopy(existing)
        self.assertIs(can_book(800, 850, 540, False, existing), True)
        self.assertEqual(existing, before)

    def test_nonmutation_conflict(self):
        existing = [[700, 760], [600, 660]]
        before = deepcopy(existing)
        self.assertIs(can_book(720, 780, 540, False, existing), False)
        self.assertEqual(existing, before)

    def test_repeated(self):
        existing = [(600, 660)]
        self.assertIs(can_book(660, 720, 540, False, existing), True)
        self.assertIs(can_book(660, 720, 540, False, existing), True)
        self.assertEqual(existing, [(600, 660)])


if __name__ == "__main__":
    unittest.main()
